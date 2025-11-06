import { APIRequestContext } from "@playwright/test";

import settings from "settings";
import { TestResultsResponse } from "utils/dws-test-result";

export default class DwsApi {
  private readonly baseUrl: string = `${settings.DWS_URL}/SwifTest`;
  private readonly request: APIRequestContext;
  private cookies: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.cookies = "";
  }

  /**
   * Set cookies for API requests
   * @param cookieString The cookie string to use for requests
   */
  setCookies(cookieString: string) {
    this.cookies = cookieString;
  }

  /**
   * Get common headers including cookies
   */
  private getHeaders() {
    return {
      Cookie: this.cookies,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * Get all queue items
   */
  async getQueueItems() {
    const response = await this.request.get(`${this.baseUrl}/Queue/GetItems`, {
      headers: this.getHeaders(),
    });
    return (await response.json()) as Array<{
      title: string;
      key: string;
      description: string;
      [key: string]: any;
    }>;
  }

  /**
   * Get automated test queues for a specific test queue
   * @param testQueueId The ID of the test queue
   * @param page Page number
   * @param pageSize Number of items per page
   */
  async GetAutomatedTestQueuesForTestQueue(
    testQueueId: string | number,
    page: number = 1,
    pageSize: number = 50,
  ): Promise<{ [key: string]: any }> {
    const response = await this.request.post(`${this.baseUrl}/Queue/GetAutomatedTestQueuesForTestQueue`, {
      headers: this.getHeaders(),
      data: {
        page,
        pageSize,
        testQueueId,
      },
    });
    return (await response.json()) as { [key: string]: any };
  }

  /**
   * Retrieves the list of automated tests associated with a specific test queue.
   *
   * @param testQueueId - The unique identifier of the test queue (string or number).
   * @returns A promise that resolves to an object containing the automated test list and related data.
   *
   * @remarks
   * Sends a GET request to the `/Queue/GetAutomatedTestListForTestQueue` endpoint with the specified `testQueueId`.
   * The request includes pagination parameters (`page=1`, `pageSize=100`) and custom headers.
   */
  async getAutomatedTestListForTestQueue(testQueueId: string | number): Promise<TestResultsResponse> {
    const response = await this.request.get(
      `${this.baseUrl}/Queue/GetAutomatedTestListForTestQueue?testQueueId=${testQueueId}&page=1&pageSize=${
        process.env.PAGE_SIZE ?? 100
      }`,
      {
        headers: this.getHeaders(),
      },
    );
    return (await response.json()) as TestResultsResponse;
  }

  /**
   * Find a queue item by title
   * @param title The title to search for
   */
  async findQueueItemByTitle(title: string) {
    const items = await this.getQueueItems();
    return items.find((item) => item.title === title);
  }
}
