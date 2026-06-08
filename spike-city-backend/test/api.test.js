import test from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

const requestWithSupertest = test(app);

describe('Testing GET /events endpoint', function () {
  it('responds with a valid HTTP status code and a list of events', async function () {
    const response = await requestWithSupertest
      .get('/api/v1/events')
      .query({ userId: '1234' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('events').that.is.an('array');
  });
});

describe('Testing POST /events endpoint', function () {
  it('responds with status 200 and creates a new event', async function () {
    const event = {
      date: "2025-08-15",
      location: "Main Field",
      address: "123 Sports Ave",
      description: "Team Practice",
      attendees: []
    };


    const response = await requestWithSupertest.post('/api/v1/admin/events')
        .send(event)
        .set('Accept', 'application/json');

    console.log('Response body:', response.body.created);

    expect(response.status).to.equal(200);
  });
});

describe('Testing PUT /events/:eventNum endpoint', function () {
  it('responds with status 200 and updates an existing event', async function () {
    const eventNum = 1;
    const update = {
      description: "Updated Team Practice"
    };

    const response = await requestWithSupertest.put(`/api/v1/admin/events/${eventNum}`)
      .send(update)
      .set('Accept', 'application/json');

    expect(response.status).to.equal(200);
  });
});

describe('Testing DELETE /events/:eventNum endpoint', function () {
  it('responds with status 200 and deletes an event', async function () {
    const eventNum = 1;

    const response = await requestWithSupertest.delete(`/api/v1/admin/events/${eventNum}`)
      .set('Accept', 'application/json');

    expect(response.status).to.equal(200);
  });
});
