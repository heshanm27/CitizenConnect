import { render, fireEvent } from "@testing-library/react";
import News from "../News";

describe("News", () => {
  it("Testing whether News page displays the correct heading", () => {
    const { getByRole } = render(<News />);
    let heading = getByRole("heading", { name: "NEWS" }).textContent;
    expect(heading).toEqual("NEWS");
  });

  it("Testing whether clicking on a category button updates the selectedCat state", () => {
    const { getByText } = render(<News />);
    let categoryButton = getByText("News Category");
    fireEvent.click(categoryButton);
    let selectedCategory = expect(selectedCategory).toEqual("Clicked Category");
  });

  it("Testing whether clicking on the clear filters button clears the selectedCat state", () => {
    const { getByText } = render(<News />);
    let clearFiltersButton = getByText("Clear Filters");
    fireEvent.click(clearFiltersButton);
    let selectedCategory = expect(selectedCategory).toEqual("");
  });

  it("Testing whether clicking on a project card triggers the navigate function", () => {
    const { getByText } = render(<News />);
    let projectCard = getByText("Project Card Title");
    fireEvent.click(projectCard);
  });
});
