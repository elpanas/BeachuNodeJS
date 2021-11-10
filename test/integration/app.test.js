const request = require('supertest'),
  mongoose = require('mongoose'),
  config = require('../../config/config'),
  {
    generatePostFakeInfos,
    generatePutFakeInfos,
  } = require('../../functions/functions');

let server, auth, bid, uid, lat, long, patchedData;

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});
beforeEach(() => {
  server = require('../../app');
  auth = config.app.auth;
  bid = '617c09616263be33dccdf5a2';
  uid = 'CdGMzNaQZZW6ckRqcEeWxFhauRa2';
  lat = 41.4566583;
  long = 15.5343864;
  patchedData = {
    av_umbrellas: 145,
  };
});
afterEach(() => server.close());
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

const execPost = async () => {
  const newBath = generatePostFakeInfos();
  return await request(server)
    .post('/api/bath/')
    .set({ Authorization: auth })
    .send(newBath);
};

const execGetBath = async () => {
  return await request(server)
    .get(`/api/bath/bath/${bid}`)
    .set({ Authorization: auth });
};

const execGetGest = async () => {
  return await request(server)
    .get(`/api/bath/gest/${uid}`)
    .set({ Authorization: auth });
};

const execGetCoord = async () => {
  return await request(server)
    .get(`/api/bath/disp/coord/${lat}/${long}`)
    .set({ Authorization: auth });
};

const execPatch = async () => {
  return await request(server)
    .patch(`/api/bath/${bid}`)
    .set({ Authorization: auth })
    .send(patchedData);
};

const execPut = async () => {
  const updatedBath = generatePutFakeInfos();
  return await request(server)
    .put(`/api/bath/${bid}`)
    .set({ Authorization: auth })
    .send(updatedBath);
};

const execDelete = async () => {
  return await request(server)
    .delete(`/api/bath/${bid}`)
    .set({ Authorization: `${auth}` });
};

describe('/api/bath', () => {
  describe('POST /', () => {
    it('should post a new bath', async () => {
      const res = await execPost();
      expect(res.statusCode).toBe(201);
    });
    // FAIL
    it('should fail because of lack of authorization', async () => {
      auth = '';
      const res = await execPost();
      expect(res.statusCode).toBe(401);
    });

    it('should fail because the resource already exists', async () => {
      const res = await execPost();
      expect(res.statusCode).toBe(400);
    });
    // END FAIL
  });

  describe('GET', () => {
    it('should get all the bath in the radius', async () => {
      const res = await execGetCoord();
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    it('/bath/:id should get the bath with given id', async () => {
      const res = await execGetBath();
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    it("/gest/:id should get every bath with the given gest's id", async () => {
      const res = await execGetGest();

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
    // FAIL

    it('/disp/coord/:lat/:long should fail because of lack of auth', async () => {
      auth = '';
      const res = await execGetCoord();
      expect(res.statusCode).toBe(401);
    });

    it('/disp/coord/:lat/:long should fail because of no bathes', async () => {
      lat = 0.0;
      long = 0.0;
      const res = await execGetCoord();
      expect(res.statusCode).toBe(400);
    });

    it('/bath/:id should fail because of lack of auth', async () => {
      auth = '';
      const res = await execGetBath();
      expect(res.statusCode).toBe(401);
    });

    it('/bath/:id should fail because bath does not exist', async () => {
      bid = 'fakeBathId';
      const res = await execGetBath();
      expect(res.statusCode).toBe(400);
    });

    it('/gest/:id should fail because of lack of auth', async () => {
      auth = '';
      const res = await execGetGest();
      expect(res.statusCode).toBe(401);
    });

    it('/bath/:id It should fail because of wrong user ID', async () => {
      uid = 'fakeUserId';
      const res = await execGetGest();
      expect(res.statusCode).toBe(400);
    });
  });

  describe('PATCH', () => {
    it('/:id should update part of the bath with the given id', async () => {
      const res = await execPatch();
      expect(res.statusCode).toBe(200);
    });
    // FAIL
    it('/:id should fail because of lack of auth', async () => {
      auth = '';
      const res = await execPatch();
      expect(res.statusCode).toBe(401);
    });

    it('/:id should fail because of bath ID does not exist', async () => {
      bid = '617c09616263be33dccdf5a5';
      const res = await execPatch();
      expect(res.statusCode).toBe(400);
    });

    it('/:id should fail because of wrong bath ID', async () => {
      bid = 'fakeBathId';
      const res = await execPatch();
      expect(res.statusCode).toBe(400);
    });

    // END FAIL
  });

  describe('PUT', () => {
    it('/:id should update the whole bath with the given id', async () => {
      const res = await execPut();
      expect(res.statusCode).toBe(200);
    });
    // FAIL
    it('/:id should fail because of lack of auth', async () => {
      auth = '';
      const res = await execPut();
      expect(res.statusCode).toBe(401);
    });

    it('/:id should fail because of wrong bid', async () => {
      bid = 'fakeBid';
      const res = await execPut();
      expect(res.statusCode).toBe(400);
    });
    //END FAIL
  });

  describe('DELETE', () => {
    it('/:id should delete the bath with given id', async () => {
      const res = await execDelete();
      expect(res.statusCode).toBe(200);
    });

    // FAIL
    it('/:id should fail beceause of a lack of auth', async () => {
      auth = '';
      const res = await execDelete();
      expect(res.statusCode).toBe(401);
    });

    it('/:id should fail beceause of a missing resource', async () => {
      bid = 'fakeBathId';
      const res = await execDelete();
      expect(res.statusCode).toBe(400);
    });
    // END FAIL
  });
});
