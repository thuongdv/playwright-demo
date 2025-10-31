import axios from "axios";

import settings from "settings";

interface JiraApproximateCountResponse {
  count: number;
}

interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    status: {
      name: string;
    };
    created: string;
    updated: string;
  };
}

interface JiraSearchResponse {
  issues: JiraIssue[];
  total: number;
  startAt: number;
  maxResults: number;
}

export class JiraClient {
  private readonly baseUrl: string;
  private readonly encodedCredentials: string;

  constructor() {
    this.baseUrl = settings.JIRA_BASE_URL;
    this.encodedCredentials = Buffer.from(`${settings.JIRA_EMAIL}:${settings.JIRA_API_TOKEN}`).toString("base64");
  }

  /**
   * Get headers for Jira API requests
   */
  private getHeaders() {
    return {
      Authorization: `Basic ${this.encodedCredentials}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Atlassian-Token": "no-check",
    };
  }

  /**
   * Get approximate issue count based on JQL query
   * @param jql The JQL query string
   * @returns The approximate count of issues matching the query
   */
  async getApproximateIssueCount(jql: string): Promise<number> {
    try {
      const response = await axios.post<JiraApproximateCountResponse>(
        `${this.baseUrl}/rest/api/3/search/approximate-count`,
        { jql },
        { headers: this.getHeaders() },
      );
      return response.data.count;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Jira API Request Failed:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  }

  /**
   * Search for issues using JQL
   * @param jql The JQL query string
   * @param startAt Starting index for pagination
   * @param maxResults Maximum number of results to return
   * @returns The search results including issues and total count
   */
  async searchIssues(jql: string, startAt = 0, maxResults = 50): Promise<JiraSearchResponse> {
    try {
      const response = await axios.post<JiraSearchResponse>(
        `${this.baseUrl}/rest/api/3/search`,
        {
          jql,
          startAt,
          maxResults,
          fields: ["key", "summary", "status", "created", "updated"],
        },
        { headers: this.getHeaders() },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Jira API Request Failed:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        });
      }
      throw error;
    }
  }
}
