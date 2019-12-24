import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

//updates the last used date for the workout
export async function main(event, context) {
  const data = JSON.parse(event.body);
  console.log("HIII");
  console.log(JSON.stringify(data));

  const params = {
    TableName: "swim_workout_table",
    Key: {
      username: data.username,
      workout_id: data.workout_id
    },
    UpdateExpression: "SET last_used = :last_used_value",
    ExpressionAttributeValues: {
      ":last_used_value": new Date().toLocaleString("en-US", {timeZone: "America/Chicago"}).toString()
    },
    ReturnValues: "NONE"
  };

  try {
    await dynamoDbLib.call("update", params);
    console.log(params.Item);
    return success(params.Item);
  } catch (e) {
    console.log(e.message);
    return failure({ status: false, message: e.message });
  }
}
