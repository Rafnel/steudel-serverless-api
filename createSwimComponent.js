import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "swim_components_table",
    Item: {
      username: data.username,
      component_id: uuid.v1(),
      component_body: data.component_body,
      difficulty: data.difficulty,
      date_created: new Date().toLocaleString("en-US", {timeZone: "America/Denver"}).toString(),
      intervals: data.intervals,
      set: data.set,
      tags: data.tags,
      yardage: data.yardage,
      likes: 0,
      dislikes: 0
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
