import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//instantiates a new user in the database
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "user_table",
    Item: {
      username: data.username,
      liked_components: [],
      liked_workouts: []
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
