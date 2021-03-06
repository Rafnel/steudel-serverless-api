import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

//gets user swim folder
export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "swim_workout_folders",
        KeyConditionExpression: "owner_username = :owner_username and folder_name = :folder_name",
        ExpressionAttributeValues: {
            ":owner_username": data.owner_username,
            ":folder_name": data.folder_name
        }
    };

    const result = await dynamoDbLib.call("query", params);
    console.log(JSON.stringify(result));
    if (result.Items) {
      // Return the retrieved items
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Items not found." });
    }
}