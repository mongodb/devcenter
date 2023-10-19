import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';
import axios from 'axios';
import { feedbackHandler } from '../../pages/api/createFeedback';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('axios'); // Mock the axios module

describe('feedbackHandler', () => {
    let mockRequest: MockRequest<NextApiRequest>;
    let mockResponse: MockResponse<NextApiResponse>;

    beforeEach(() => {
        mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/api/createFeedback',
            body: {
                stars: 5,
                slug: 'test-slug',
                title: 'Test title',
            },
        });
        mockResponse = httpMocks.createResponse();
    });

    it('should return 405 for non-POST requests', async () => {
        mockRequest.method = 'GET';
        await feedbackHandler(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(405);
        expect(mockResponse._getJSONData().message).toEqual(
            'This is a POST-only endpoint.'
        );
    });

    it('should return 400 for invalid POST body', async () => {
        mockRequest.body = { invalid: 'body' };
        await feedbackHandler(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(400);
        expect(mockResponse._getJSONData().message).toEqual(
            'Invalid POST body.'
        );
    });

    it('should handle successful axios post', async () => {
        const mockData = { _id: 123 };
        (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockData });

        await feedbackHandler(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(200);
        expect(mockResponse._getJSONData()).toEqual(mockData);
    });
});
