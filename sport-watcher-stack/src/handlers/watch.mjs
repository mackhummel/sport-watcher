import { dynamoDelete, dynamoPut, dynamoScan } from "../utils/dynamo-helper.js";

const user_pk = "USER";

export const getWatches = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getWatches only accept GET method, you tried: ${event.httpMethod}`);
  }
  const cognito_info = event?.requestContext?.authorizer?.claims ?? null;
  if (cognito_info) {
    const params = {
      TableName: process.env.TABLE_NAME,
      FilterExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `${user_pk}#${cognito_info.sub}`
      }
    }
    let scan_items = null;
    try {
      scan_items = await dynamoScan(params);
    } catch (err) {
      console.log("Error", err);
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        watches: scan_items.map((obj)=>{
          return {
            id: obj.id,
            league: obj.league,
            timestamp: obj.timestamp
          }
        })
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': '*'
      }
    };
    return response;
  }
  else {
    const resp = {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': '*'
      }
    }
    return resp;
  }
}

export const postWatch = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postWatch only accept POST method, you tried: ${event.httpMethod}`);
  }
  console.log(event);
  const cognito_info = event?.requestContext?.authorizer?.claims ?? null;
  if (cognito_info) {
    const event_body = JSON.parse(event.body);
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        "PK": `${user_pk}#${cognito_info.sub}`,
        "SK": `NFL#${event_body.id}`,
        "id": event_body.id,
        "league": 'NFL',
        "timestamp": new Date().toISOString()
      },
    }

    try {
      await dynamoPut(params);
    } catch (err) {
      console.log("Error", err);
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': '*'
      }
    };
    return response;
  }
  else {
    const resp = {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': '*'
      }
    }
    return resp;
  }
}

export const deleteWatch = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(`deleteWatch only accept DELETE method, you tried: ${event.httpMethod}`);
  }
  const cognito_info = event?.requestContext?.authorizer?.claims ?? null;
  if (cognito_info) {
    const event_body = JSON.parse(event.body)
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        "PK": `${user_pk}#${cognito_info.sub}`,
        "SK": `NFL#${event_body.id}`
      },
    }
    try {
      await dynamoDelete(params);
    } catch (err) {
      console.log("Error", err);
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': '*'
      }
    };
    return response;
  }
  else {
    const resp = {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': '*'
      }
    }
    return resp;
  }
}