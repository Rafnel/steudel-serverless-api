import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
      TableName: "swim_workout_table",
      KeyConditionExpression: "username = :username",
      ExpressionAttributeValues: {
          ":username": data.username
      }
    };

    const result = await dynamoDbLib.call("query", params);
    if (result.Items) {
      // Return the retrieved items
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
}