# README

Installation options: 
1. `npm install -g serverless`

Commands for deployment:
- dev: `serverless deploy --stage dev`
- prod: `serverless deploy --stage prod`

To debug locally/offline run:<br />
`serverless offline --stage {your choice of stage}`

**Important**:<br />
Use `npx` at the beginning of the command so that the local project version of serverless is used.

## Endpoints
- **dev endpoint**: `https://<your endpoint>.amazonaws.com`
- **prod endpoint**: `https://<your endpoint>.amazonaws.com`

## API Usage

### `/getBill/{id}`
Method: `GET`<br />
Example: `https://sea68v01x9.execute-api.us-east-1.amazonaws.com/getBill/cdmntpfi`

### `/createBill`
Method: `POST`<br />
Example: `https://sea68v01x9.execute-api.us-east-1.amazonaws.com/createBill`<br />
Include in the body params:
```
{
	"email": "harishadi.dev@gmail.com",
	"mobile": "012345678",
	"name": "Pakalu Papito",
	"amount": 30000,
	"description": "test transaction from postman",
	"redirect_url": "http://localhost:3000/"
}
```

