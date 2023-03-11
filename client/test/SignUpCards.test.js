import TestCardItem from './TestCardItem';
import TestButton from './TestButton';

const cardItems = [
  ['images/roadsideassistance.jpg', 'Sign Up as Assistance Professional', '/signup-ap'],
  ['images/motorist.jpg', 'Sign Up as Motorist', '/signup-motorist'],
]

describe("SignUpCards", () => {
  test.each(cardItems)(
    "Test CardItems %p %p %p",
    (src, text, path) => {
      TestCardItem(src, text, path);
    }
  )

  it("Test button", () => {
    TestButton({ content: 'Have an account? Log in', linkto: '/login', buttonStyle: 'btn--filled', buttonSize: 'btn--large' });
  });
});
