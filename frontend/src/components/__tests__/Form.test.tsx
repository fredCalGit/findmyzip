import { render } from "@testing-library/react";
import { Form } from "../Form";

test("renders the Form", () => {
  const mockFunction = jest.fn();

  const { container } = render(<Form handleSubmit={mockFunction} />);
  expect(container).toMatchSnapshot();
});
