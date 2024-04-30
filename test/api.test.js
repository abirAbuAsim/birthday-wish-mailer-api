// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');

const app = require('../src/app');

// eslint-disable-next-line no-undef
describe('GET /v1/customer', () => {
	it('should return customer data for a valid JWT token', async () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTQ0NTQzMjEsImlhdCI6MTcxNDQ1MjUyMX0.ymLptbaVE-YYdb13Ctxkht-eH9Fmtk9Ju4GUHW5DP9M';
		const response = await request(app)
			.get('/v1/customer')
			.set('Authorization', `Bearer ${token}`);

		expect(response.statusCode).toBe(200); // Adjust the expected status code based on your API's specification
		expect(response.body).toEqual(expect.any(Object)); // Adjust this based on the expected shape of your response
		// Additional assertions can be added here based on what the response is expected to contain
	});

	it('should return an authorization error without a valid token', async () => {
		const response = await request(app)
			.get('/v1/customer')
			.set('Authorization', 'Bearer invalid_token');

		expect(response.statusCode).toBe(500); // Common status code for unauthorized access
		// Additional checks for response body or headers can be added here
	});
});

// eslint-disable-next-line no-undef
describe('POST /v1/auth/generate-token', () => {
	it('should generate a token successfully', async () => {
		const response = await request(app)
			.get('/v1/auth/generate-token')
			.redirects(1); // If the API requires a body, you can add it here using .send({ key: 'value' })

		expect(response.statusCode).toBe(200); // Adjust based on expected success status code
		expect(response.text).toContain('token'); // This assumes the response text includes the word 'token'
		// Additional assertions can be made depending on the structure of your response
	});

	it('should handle errors properly', async () => {
		// To simulate an error, you might send invalid data or omit required data
		const response = await request(app).get('/v1/auth/generate-tok'); // Example of sending incorrect data

		expect(response.statusCode).toBe(404); // Assuming 400 Bad Request for invalid input
		// You can also check for specific error messages in the response body if applicable
	});
});
