# -*- coding: utf-8 -*-
"""
Generate ELS Daily PASS/FAIL report from multiple JSON/TXT report files or folders.
"""
import argparse, json, base64, io, os, sys, webbrowser, re, glob
from datetime import datetime
from zoneinfo import ZoneInfo
import matplotlib.pyplot as plt

# ----------------- Helpers -----------------
def read_items(path):
    with open(path, "r", encoding="utf-8") as f:
        raw = json.load(f)
    items = raw.get("data", {}).get("Value", [])
    if not isinstance(items, list):
        raise ValueError("data.Value must be a list")
    return items

def is_pass(val):
    if isinstance(val, bool):
        return val is True
    if isinstance(val, (int, float)):
        return float(val) == 1.0
    s = str(val).strip().upper()
    return s in {"SUCCESS", "PASS", "PASSED", "OK", "TRUE", "1"}

def parse_duration_seconds(d):
    if d is None:
        return 0.0
    if isinstance(d, (int, float)):
        v = float(d)
        return v / 1000.0 if v > 100000 else v
    s = str(d).strip().replace(",", ".")
    if not s:
        return 0.0
    if s.upper().startswith("PT"):
        h = m = sec = 0.0
        mobj = re.findall(r"(\d+(?:\.\d+)?)([HMS])", s.upper())
        for val, unit in mobj:
            if unit == "H": h = float(val)
            elif unit == "M": m = float(val)
            elif unit == "S": sec = float(val)
        return h * 3600 + m * 60 + sec
    parts = s.split(":")
    try:
        if len(parts) == 3:
            return int(parts[0])*3600 + int(parts[1])*60 + float(parts[2])
        elif len(parts) == 2:
            return int(parts[0])*60 + float(parts[1])
        elif len(parts) == 1:
            v = float(parts[0])
            return v / 1000.0 if v > 100000 else v
    except:
        pass
    if s.isdigit():
        v = float(s)
        return v / 1000.0 if v > 100000 else v
    return 0.0

def format_hms(seconds):
    total = int(round(float(seconds)))
    h = total // 3600
    m = (total % 3600) // 60
    s = total % 60
    return f"{h:02}:{m:02}:{s:02}"

def make_chart_overall(project_stats):
    fig, ax = plt.subplots(figsize=(6, 4))
    projects = list(project_stats.keys())
    pass_counts = [project_stats[p]["pass"] for p in projects]
    fail_counts = [project_stats[p]["fail"] for p in projects]
    ax.bar(range(len(projects)), pass_counts, label="PASS", color="#22c55e")
    ax.bar(range(len(projects)), fail_counts, bottom=pass_counts, label="FAIL", color="#ef4444")
    ax.set_title("PASS/FAIL by Project")
    ax.set_ylabel("Count")
    ax.set_xticks(range(len(projects)))
    ax.set_xticklabels(projects, rotation=15, ha="right")
    ax.legend()
    buf = io.BytesIO()
    plt.tight_layout()
    fig.savefig(buf, format="png")
    plt.close(fig)
    return base64.b64encode(buf.getvalue()).decode("ascii")

def make_chart_pie(total_all):
    fig, ax = plt.subplots(figsize=(4, 4))
    values = [total_all["pass"], total_all["fail"]]
    labels = ["PASS", "FAIL"]
    colors = ["#22c55e", "#ef4444"]
    ax.pie(values, labels=labels, autopct="%1.1f%%", startangle=90, colors=colors)
    ax.set_title("PASS/FAIL All Projects")
    buf = io.BytesIO()
    plt.tight_layout()
    fig.savefig(buf, format="png")
    plt.close(fig)
    return base64.b64encode(buf.getvalue()).decode("ascii")

def html_escape(s):
    return (str(s)
            .replace("&","&amp;")
            .replace("<","&lt;")
            .replace(">","&gt;")
            .replace('"',"&quot;"))

def build_table(rows, columns, table_id):
    thead = "<tr>" + "".join(f"<th>{html_escape(h)}</th>" for _, h in columns) + "</tr>"
    body_parts = []
    for r in rows:
        tds = []
        for field, _ in columns:
            val = str(r.get(field, ''))
            if field == "Status":
                color = "#22c55e" if val == "PASS" else "#ef4444"
                tds.append(f"<td data-status='{val}' style='font-weight:bold;color:{color}'>{val}</td>")
            else:
                tds.append(f"<td data-status='{r.get('Status','')}'>{html_escape(val)}</td>")
        body_parts.append("<tr class='status-row' data-status='{}'>".format(r.get("Status","")) + "".join(tds) + "</tr>")
    tbody = "\n".join(body_parts) if body_parts else f"<tr><td colspan='{len(columns)}'>No data</td></tr>"
    return f"<table id='{table_id}' class='pass-fail-table'>\n<thead>{thead}</thead>\n<tbody>\n{tbody}\n</tbody>\n</table>"

def extract_project_number(name):
    match = re.match(r"\s*(\d+)", str(name))
    return int(match.group(1)) if match else 999999

# ----------------- HTML Build -----------------
def build_html(project_data, report_date=None):
    sorted_projects = sorted(project_data.keys(), key=extract_project_number)
    project_stats = {}
    total_all = {"total": 0, "pass": 0, "fail": 0, "duration_sec": 0}
    for pname in sorted_projects:
        items = project_data[pname]
        p_count = sum(1 for x in items if is_pass(x.get("successful")))
        f_count = len(items) - p_count
        total_sec = sum(parse_duration_seconds(x.get("duration", 0)) for x in items)
        project_stats[pname] = {"pass": p_count, "fail": f_count, "total": len(items), "duration_sec": total_sec}
        total_all["total"] += len(items)
        total_all["pass"] += p_count
        total_all["fail"] += f_count
        total_all["duration_sec"] += total_sec

    chart_overall_b64 = make_chart_overall(project_stats)
    chart_pie_b64 = make_chart_pie(total_all)
    # Use ZoneInfo when available; on some Windows installs the tz database
    # may be missing which raises "No time zone found with key ...".
    # Fall back to a fixed UTC+7 timezone for Asia/Ho_Chi_Minh if ZoneInfo fails.
    try:
        tz = ZoneInfo("Asia/Ho_Chi_Minh")
    except Exception:
        # local import to avoid changing module-level imports and keep
        # compatibility if timezone/timedelta are not needed elsewhere.
        from datetime import timezone, timedelta
        tz = timezone(timedelta(hours=7))
    now = datetime.now(tz).strftime("%Y-%m-%d %H:%M:%S")

    # Summary
    summary_rows = []
    for pname in sorted_projects:
        stats = project_stats[pname]
        summary_rows.append({
            "Project": pname,
            "Total": stats['total'],
            "PASS": stats['pass'],
            "FAIL": stats['fail'],
            "Total Duration": format_hms(stats["duration_sec"])
        })
    summary_rows.append({
        "Project": "All Projects",
        "Total": total_all['total'],
        "PASS": total_all['pass'],
        "FAIL": total_all['fail'],
        "Total Duration": format_hms(total_all["duration_sec"])
    })
    summary_cols = [("Project","Project"), ("Total","Total"), ("PASS","PASS"), ("FAIL","FAIL"), ("Total Duration","Total Duration")]
    summary_table = build_table(summary_rows, summary_cols, "summary").replace("<table", "<table class='summary-table'")

    # Test case tables
    cols = [("Index","Index"), ("testName","Test Name"), ("scenarioName","Scenario"),
            ("executedByUserName","Executed By"), ("executionStartTimeStamp","Start Time"),
            ("executionEndTimeStamp","End Time"), ("Duration","Duration"), ("Status","Status")]

    tables_html = ""
    for pname in sorted_projects:
        items = project_data[pname]
        rows = []
        for i, x in enumerate(items, 1):
            x["Duration"] = format_hms(parse_duration_seconds(x.get("duration", 0)))
            status = "PASS" if is_pass(x.get("successful")) else "FAIL"
            rows.append(dict(Index=i, Status=status, **x))
        tables_html += f"<h3>{html_escape(pname)}</h3>"
        tables_html += "<div class='filter-container'><label class='filter-label'>Status Filter: <select onchange=\"filterStatus(this, '{}')\" class='status-select'>".format(pname.replace(" ","_"))
        tables_html += "<option value='ALL' style='font-weight:bold;color:#444;'>ALL</option>"
        tables_html += "<option value='PASS' style='font-weight:bold;color:#22c55e;'>PASS</option>"
        tables_html += "<option value='FAIL' style='font-weight:bold;color:#ef4444;' selected>FAIL</option>"
        tables_html += "</select></label></div>"
        tables_html += build_table(rows, cols, table_id=pname.replace(" ","_"))

    title = f"ELS - Daily Report {report_date}" if report_date else "ELS - Daily Report"

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>{title}</title>
<style>
body {{ font-family: Arial, sans-serif; background:#f8fafc; color:#111; padding:20px; }}
.summary-table {{ border-collapse: collapse; width: 100%; margin-bottom: 20px; }}
.summary-table th, .summary-table td {{ border:1px solid #ccc; padding:8px; text-align:left; }}
.summary-table th {{ background:#f1f5f9; }}
.pass-fail-table {{ border-collapse: collapse; width: 100%; margin-bottom: 20px; table-layout: fixed; }}
.pass-fail-table th, .pass-fail-table td {{ border:1px solid #ccc; padding:8px; text-align:left; word-wrap: break-word; }}
.pass-fail-table th {{ background:#f1f5f9; }}
.pass-fail-table th:nth-child(1), .pass-fail-table td:nth-child(1) {{ width: 50px; text-align: center; }}
.pass-fail-table th:nth-child(2), .pass-fail-table td:nth-child(2) {{ width: 300px; }}
.pass-fail-table th:nth-child(4), .pass-fail-table td:nth-child(4) {{ width: 120px; }}
.pass-fail-table th:last-child, .pass-fail-table td:last-child {{ width: 80px; text-align: center; }}
.filter-container {{ margin: 8px 0; }}
.filter-label {{ font-weight:bold; font-size:14px; }}
.status-select option {{ font-weight:bold; }}
</style>
<script>
function filterStatus(sel, tableId) {{
  var value = sel.value;
  var table = document.getElementById(tableId);
  var rows = table.getElementsByClassName('status-row');
  for (var i = 0; i < rows.length; i++) {{
    var r = rows[i];
    if (value === 'ALL' || r.getAttribute('data-status') === value) {{
      r.style.display = '';
    }} else {{
      r.style.display = 'none';
    }}
  }}
}}
window.onload = function() {{
  var selects = document.querySelectorAll('label select');
  selects.forEach(function(sel) {{
    sel.value = 'FAIL';
    sel.dispatchEvent(new Event('change'));
  }});
}}
</script>
</head>
<body>
<h1>{title}</h1>
<div>Generated at {html_escape(now)}</div>

<h2>Overall PASS/FAIL Charts</h2>
<div style="display:flex;gap:20px;flex-wrap:wrap;">
  <img src="data:image/png;base64,{chart_overall_b64}" style="max-width:100%;border:1px solid #ccc;border-radius:8px;padding:8px;">
  <img src="data:image/png;base64,{chart_pie_b64}" style="max-width:100%;border:1px solid #ccc;border-radius:8px;padding:8px;">
</div>

<h2>Summary by Project</h2>
{summary_table}

<h2>Test Cases by Project</h2>
{tables_html}

</body>
</html>
"""
    return html

# ----------------- Main -----------------
def main():
    parser = argparse.ArgumentParser(description="Generate ELS Daily PASS/FAIL HTML report")
    parser.add_argument("inputs", nargs="+", help="Paths to JSON/TXT files or folders")
    parser.add_argument("-o", "--output", default="ELS_daily_report.html", help="Output HTML file")
    parser.add_argument("--open", action="store_true", help="Open after generation")
    args = parser.parse_args()

    project_data = {}
    for path in args.inputs:
        if os.path.isdir(path):
            files = glob.glob(os.path.join(path, "*.json")) + glob.glob(os.path.join(path, "*.txt"))
        else:
            files = glob.glob(path)
        for f in files:
            try:
                items = read_items(f)
                if items:
                    pname = items[0].get("projectName", os.path.basename(f))
                    project_data[pname] = items
            except Exception as e:
                print(f"⚠️ Skip {f}: {e}", file=sys.stderr)

    if not project_data:
        print("No valid data found!", file=sys.stderr)
        sys.exit(1)

    # lấy ngày từ folder đầu tiên
    report_date = None
    first_input = args.inputs[0]
    if os.path.isdir(first_input):
        report_date = os.path.basename(os.path.normpath(first_input))

    html = build_html(project_data, report_date)
    with open(args.output, "w", encoding="utf-8") as w:
        w.write(html)
    print(f"✔ Report generated: {args.output}")
    if args.open:
        webbrowser.open_new_tab(os.path.abspath(args.output))

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("Error:", e, file=sys.stderr)
        sys.exit(1)
