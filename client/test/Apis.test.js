import axios from "../src/api/axios";
import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, getByText, render, screen } from '@testing-library/react';
import uuid from 'react-uuid'

const generateNumber = () => {
  let num = "";
  for (let i = 0; i < 10; i++)
    num += (Math.random() * 10);
  return num;
}

const TESTCASES = [
  [
    'Signup success',
    {
      data: {
        firstName: `test${uuid()}`,
        lastName: `test${uuid()}`,
        gender: 'Male',
        dob: '01/10/2000',
        email: `${uuid()}@gmail.com`,
        phoneNumber: generateNumber(),
        password: "password",
      },
      url: '/signup/assistance-professional',
      expect: 'success',
    }
  ],
  [
    'Signup error',
    {
      data: {
        firstName: 'test111',
        lastName: 'test111',
        gender: 'Male',
        dob: '01/10/2000',
        email: `${uuid()}@gmail.com`,
        phoneNumber: "0123456789",
        password: "password",
      },
      url: '/signup/assistance-professional',
      expect: 'error',
    }
  ],
  [
    'Login AP success', 
    {
      data: {
        email: "Brian.Lesch@gmail.com", 
        password: "password"
      },
      url: "/login/assistance-professional",
      expect: 'success',
    }
  ],
  [
    'Login AP email error',
    {
      data: {
        email: "test2@gmail.com", 
        password: "password"
      },
      url: "/login/assistance-professional",
      expect: 'error',
    }
  ],
  [
    'Login AP password error',
    {
      data: {
        email: "Brian.Lesch@gmail.com", 
        password: "password1"
      },
      url: "/login/assistance-professional",
      expect: 'error',
    }
  ],
  [
    'Login motorist success',
    {
      data: {
        email: "Micheal_Muller@hotmail.com", 
        password: "password",
      },
      url: "/login/member",
      expect: 'success',
    }
  ],
  [
    'Login motorist email error',
    {
      data: {
        email: "test_motor1@gmail.com", 
        password: "password"
      },
      url: "/login/member",
      expect: 'error',
    }
  ],
  [
    'Login motorist password error',
    {
      data: {
        email: "Micheal_Muller@hotmail.com", 
        password: "password1"
      },
      url: "/login/member",
      expect: 'error',
    }
  ],
  [
    'Service request member success',
    {
      data: {
        firstName: 'Micheal',
        lastName: 'Muller',
        phoneNumber: '0475044195',
        streetName: 'streetNanme',
        streetNum: 123,
        suburb: 'suburb',
        nearestCrossroadArr: ['cross 1', 'cross 2'],
        plateNumber: 123,
        manufacturer: 'manufacturer',
        model: 'A', 
        year: 2000,
        body_type: 'A',
        colour: 'red', 
        serviceType: 'type', 
      },
      url: "/service-request/member",
      expect: 'success',
    }
  ],
  [
    'Service request member error',
    {
      data: {
        firstName: 'test',
        lastName: 'tests',
        phoneNumber: '',
        streetName: 'streetNanme',
        streetNum: '123',
        suburb: 'suburb',
        nearestCrossroadArr: ['cross 1', 'cross 2'],
        plateNumber: 123,
        manufacturer: 'manufacturer',
        model: 'A',
        year: 2000,
        body_type: 'A',
        colour: 'red', 
        serviceType: 'type', 
      },
      url: "/service-request/member",
      expect: 'error',
    }
  ],
  [
    'Service request customer success',
    {
      data: {
        firstName: 'test',
        lastName: 'tests',
        phoneNumber: '1234567890',
        streetName: 'streetNanme',
        streetNum: 123,
        suburb: 'suburb',
        nearestCrossroadArr: ['cross 1', 'cross 2'],
        plateNumber: 123,
        manufacturer: 'manufacturer',
        model: 'A', 
        year: 2000,
        body_type: 'A',
        colour: 'red', 
        serviceType: 'type', 
      },
      url: "/service-request/customer",
      expect: 'success',
    }
  ],
  [
    'Service request customer error',
    {
      data: {
        firstName: 'test',
        lastName: 'tests',
        phoneNumber: '',
        streetName: 'streetNanme',
        streetNum: '123',
        suburb: 'suburb',
        nearestCrossroadArr: ['cross 1', 'cross 2'],
        plateNumber: 123,
        manufacturer: 'manufacturer',
        model: 'A', 
        year: 2000,
        body_type: 'A',
        colour: 'red', 
        serviceType: 'type', 
      },
      url: "/service-request/customer",
      expect: 'error',
    }
  ],  
]

describe('Apis', () => {
  test.each(TESTCASES) (
    "%p",
    async (_, values) => {
      const { data } = await axios.post(values.url, values.data);
      expect(data.result).toBe(values.expect);
    }
  )
});
