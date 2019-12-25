import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

//this function gets folders with parent of the sent in parent folder.
export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "swim_workout_folders",
        FilterExpression: "owner_username = :owner_username and parent = :parent",
        ExpressionAttributeValues: {
            ":owner_username": data.owner_username,
            ":parent": data.parent
        }
    };

    const result = await dynamoDbLib.call("scan", params);
    console.log(JSON.stringify(result));
    if (result.Items) {
      // Return the retrieved items
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Items not found." });
    }
}