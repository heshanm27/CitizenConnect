import { render, fireEvent } from "@testing-library/react";
import BudgetAllocation from "../BudgetAllocation/BudgetAllocation";

describe("Budget Handling for Citizens UI", () => {
  it("Testing for Loading of the Budget Allocation Page", () => {
    const { getByRole } = render(<BudgetAllocation />);
    let text = "Budget Allocation";
    let header = getByRole("heading", { name: text });
    expect(header.textContent).toEqual(text);
  });

  it("Testing for rendering of years", () => {
    const expectedYears = ["2018", "2019", "2020", "2021", "2022", "2023"];
    const { getAllByRole } = render(<BudgetAllocation />);
    let yearList = getAllByRole("button");

    for (let i = 0; i < yearList.length; i++) {
      expect(yearList[i].textContent).toEqual(expectedYears[i]);
    }
  });

  it("Testing whether each year only displays the relavant content", () => {
    const { getByRole } = render(<BudgetAllocation />);

    let button = getByRole("button", { name: 2023 });
    let heading = getByRole("heading", { name: 2023 });

    fireEvent.click(button);

    expect(heading.textContent).toEqual(button.textContent);
  });
});
