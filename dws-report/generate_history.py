# -*- coding: utf-8 -*-
"""
Generate ELS Overall Index Report with Daily Summary + Charts + Flaky Tests
"""
import os, sys, argparse, json, base64, io, re, subprocess
from datetime import datetime
import matplotlib.pyplot as plt
from generate_report import read_items, is_pass

def parse_date(name):
    try:
        return datetime.strptime(name, "%d-%m-%Y")
    except:
        return None

def ensure_daily_report(report_dir, gen_script):
    html_path = os.path.join(report_dir, "report.html")
    if not os.path.exists(html_path):
        json_files = [os.path.join(report_dir, f) for f in os.listdir(report_dir) if f.endswith((".json",".txt"))]
        if json_files:
            cmd = [sys.executable, gen_script, report_dir, "-o", html_path]
            subprocess.run(cmd, check=True)
    return html_path if os.path.exists(html_path) else None

def collect_data(base_dir, gen_script):
    daily_stats = []
    test_history = {}
    subfolders = [f for f in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, f))]
    for sub in subfolders:
        d = parse_date(sub)
        if not d:
            continue
        folder = os.path.join(base_dir, sub)
        report_html = ensure_daily_report(folder, gen_script)
        if not report_html:
            continue

        json_files = [os.path.join(folder, f) for f in os.listdir(folder) if f.endswith((".json",".txt"))]
        total = passed = failed = 0
        for jf in json_files:
            items = read_items(jf)
            for x in items:
                status = "PASS" if is_pass(x.get("successful")) else "FAIL"
                total += 1
                if status == "PASS": passed += 1
                else: failed += 1
                tname = x.get("testName", "Unknown")
                scen = x.get("scenarioName", "")
                pname = x.get("projectName", "Unknown Project")
                key = f"{tname}||{scen}"
                if key not in test_history:
                    test_history[key] = {
                        "project": pname,
                        "scenario": scen,
                        "runs": 0,
                        "pass": 0,
                        "fail": 0,
                        "last": status,
                        "history": []
                    }
                test_history[key][status.lower()] += 1
                test_history[key]["runs"] += 1
                test_history[key]["last"] = status
                test_history[key]["history"].append(status)

        rate = round(100.0 * passed / total, 1) if total else 0.0
        daily_stats.append({
            "date": d,
            "folder": sub,
            "total": total,
            "pass": passed,
            "fail": failed,
            "rate": rate,
        })

    daily_stats.sort(key=lambda x: x["date"], reverse=True)
    return daily_stats, test_history

def make_chart_line(daily_stats):
    fig, ax = plt.subplots(figsize=(6,4))
    dates = [d["date"].strftime("%d-%m") for d in daily_stats][::-1]
    rates = [d["rate"] for d in daily_stats][::-1]
    ax.plot(dates, rates, marker="o", color="#2563eb")
    ax.set_ylim(0,100)
    ax.set_ylabel("Pass Rate %")
    ax.set_title("Pass Rate by Day")
    ax.grid(True, linestyle="--", alpha=0.5)
    buf = io.BytesIO()
    plt.tight_layout()
    fig.savefig(buf, format="png")
    plt.close(fig)
    return base64.b64encode(buf.getvalue()).decode("ascii")

def make_chart_bar(daily_stats):
    fig, ax = plt.subplots(figsize=(6,4))
    dates = [d["date"].strftime("%d-%m") for d in daily_stats][::-1]
    passes = [d["pass"] for d in daily_stats][::-1]
    fails = [d["fail"] for d in daily_stats][::-1]
    ax.bar(dates, passes, label="PASS", color="#22c55e")
    ax.bar(dates, fails, bottom=passes, label="FAIL", color="#ef4444")
    ax.set_ylabel("Count")
    ax.set_title("PASS/FAIL by Day")
    ax.legend()
    buf = io.BytesIO()
    plt.tight_layout()
    fig.savefig(buf, format="png")
    plt.close(fig)
    return base64.b64encode(buf.getvalue()).decode("ascii")

def is_flaky(stat):
    if stat["pass"] > 0 and stat["fail"] > 0:
        last10 = stat["history"][-10:]
        if len(last10) == 10 and (all(x=="PASS" for x in last10) or all(x=="FAIL" for x in last10)):
            return False
        return True
    return False

def build_html(daily_stats, test_history, line_b64, bar_b64):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # build rows
    rows = ""
    for d in daily_stats:
        rows += f"<tr><td>{d['date'].strftime('%d-%m-%Y')}</td><td>{d['total']}</td><td>{d['pass']}</td><td>{d['fail']}</td><td>{d['rate']}%</td><td><a href='{d['folder']}/report.html'>View</a></td></tr>"

    daily_table = f"""
    <div style='max-height:400px; overflow-y:auto;'>
      <table class='summary' id='daily-table'>
      <thead><tr><th>Date</th><th>Total</th><th>PASS</th><th>FAIL</th><th>PassRate</th><th>Report</th></tr></thead>
      <tbody id='daily-tbody'>
        {rows}
      </tbody>
      </table>
    </div>
    """

    # javascript to toggle
    daily_table += f"""
    <button id='toggleBtn' onclick="toggleRows()">Load all...</button>
    <script>
    var showingAll = false;
    function toggleRows() {{
      var tbody = document.getElementById('daily-tbody');
      var rows = tbody.getElementsByTagName('tr');
      if (!showingAll) {{
        for (var i=0; i<rows.length; i++) {{ rows[i].style.display = ''; }}
        document.getElementById('toggleBtn').innerText = 'Load less';
        showingAll = true;
      }} else {{
        for (var i=10; i<rows.length; i++) {{ rows[i].style.display = 'none'; }}
        document.getElementById('toggleBtn').innerText = 'Load all...';
        showingAll = false;
      }}
    }}
    window.onload = function() {{
      var tbody = document.getElementById('daily-tbody');
      var rows = tbody.getElementsByTagName('tr');
      if (rows.length > 10) {{
        for (var i=10; i<rows.length; i++) {{ rows[i].style.display = 'none'; }}
      }}
    }}
    </script>
    """

    projects = {}
    for key, stat in test_history.items():
        if is_flaky(stat):
            projects.setdefault(stat["project"], []).append((key, stat))

    flaky_tables = ""
    for pname in sorted(projects.keys()):
        tests = projects[pname]
        flaky_rows = ""
        for i, (key, stat) in enumerate(tests, 1):
            tname, scen = key.split("||")
            flaky_rate = round(min(stat["pass"], stat["fail"]) / stat["runs"] * 100, 1)
            color_last = "#22c55e" if stat['last'] == "PASS" else "#ef4444"
            flaky_rows += f"<tr><td>{i}</td><td style='text-align:left'>{tname}</td><td style='text-align:left'>{scen}</td><td>{stat['runs']}</td><td style='color:#22c55e;font-weight:bold'>{stat['pass']}</td><td style='color:#ef4444;font-weight:bold'>{stat['fail']}</td><td>{flaky_rate}%</td><td style='color:{color_last};font-weight:bold'>{stat['last']}</td></tr>"
        if not flaky_rows:
            flaky_rows = "<tr><td colspan='8'>No flaky tests 🎉</td></tr>"
        flaky_tables += f"<h3>{pname}</h3><table class='flaky'><thead><tr><th>#</th><th>Test Name</th><th>Scenario</th><th>Total Runs</th><th>PASS</th><th>FAIL</th><th>Flaky Rate</th><th>Last Status</th></tr></thead><tbody>{flaky_rows}</tbody></table>"

    if not flaky_tables:
        flaky_tables = "<p>No flaky tests 🎉</p>"

    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ELS - Overall Report</title>
<style>
body {{ font-family: Arial, sans-serif; padding:20px; background:#f8fafc; }}
h1,h2 {{ color:#111; }}
table {{ border-collapse: collapse; width:100%; margin-bottom:20px; table-layout: fixed; }}
th,td {{ border:1px solid #ccc; padding:6px 10px; word-wrap:break-word; }}
th {{ background:#f1f5f9; text-align:center; }}
td {{ text-align:center; }}
td:nth-child(2), td:nth-child(3) {{ text-align:left; }}
/* column widths */
th:nth-child(1), td:nth-child(1) {{ width:5%; }}
th:nth-child(2), td:nth-child(2) {{ width:25%; }}
th:nth-child(3), td:nth-child(3) {{ width:25%; }}
th:nth-child(4), td:nth-child(4) {{ width:8%; }}
th:nth-child(5), td:nth-child(5) {{ width:8%; }}
th:nth-child(6), td:nth-child(6) {{ width:8%; }}
th:nth-child(7), td:nth-child(7) {{ width:10%; }}
th:nth-child(8), td:nth-child(8) {{ width:11%; }}
</style>
</head>
<body>
<h1>ELS - Overall Report</h1>
<div>Generated at {now}</div>

<h2>Daily Summary</h2>
{daily_table}

<h2>Charts</h2>
<div style="display:flex;gap:20px;flex-wrap:wrap;">
<img src="data:image/png;base64,{line_b64}" style="border:1px solid #ccc;border-radius:8px;padding:8px;">
<img src="data:image/png;base64,{bar_b64}" style="border:1px solid #ccc;border-radius:8px;padding:8px;">
</div>

<h2>Flaky Tests</h2>
{flaky_tables}

</body>
</html>
"""
    return html

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("base_dir", help="Reports base folder")
    ap.add_argument("-o", "--output", default="index.html")
    args = ap.parse_args()

    gen_script = os.path.join(os.path.dirname(__file__), "generate_report_2.py")
    daily_stats, test_history = collect_data(args.base_dir, gen_script)
    if not daily_stats:
        print("No reports found.")
        return

    line_b64 = make_chart_line(daily_stats)
    bar_b64 = make_chart_bar(daily_stats)
    html = build_html(daily_stats, test_history, line_b64, bar_b64)
    with open(args.output, "w", encoding="utf-8") as f:
        f.write(html)
    print("Index generated:", args.output)

if __name__ == "__main__":
    main()
