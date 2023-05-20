import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import Vacancies from "../Vacancies/Vacancies";
import VacanciesView from "../Vacancies/VacanciesView";
import ApplyVacancies from "../Vacancies/ApplyVacancies";

describe(Vacancies, () => {
  it("Testing whether vacancies page is loaded", () => {
    const { getByTestId } = render(<Vacancies />);
    let vacancy_list = getByTestId("vacancies_list");
    expect(vacancy_list.textContent).toEqual("Vacancies");
  });

  it("Testing whether vacancies displays the correct title", () => {
    const { getByRole } = render(<Vacancies />);
    let text = getByRole("heading", { name: "Vacancies" }).textContent;
    expect(text).toEqual("Vacancies");
  });

  it("Testing whether view vacancy button renders the view vacancy page", () => {
    const { getByRole, getByTestId } = render(<Vacancies />);
    let button = getByRole("button", { name: "View Vacancy" });
    let title = getByTestId("vacancy_title");
    fireEvent.click(button);
    expect(title.textContent).toEqual("Available Vacancies");
  });

  it("Testing whether view Apply button renders the application form", () => {
    const { getByRole, getByTestId } = render(<VacanciesView />);
    let button = getByRole("button", { name: "Apply" });
    let title = getByTestId("vacancy_application_form");
    fireEvent.click(button);
    expect(title.textContent).toEqual("Application");
  });

  it("Testing whether application form displays correct input fields", () => {
    const { getByRole } = render(<ApplyVacancies />);
    let fname = getByRole("heading", { name: "First Name" }).textContent;
    let lname = getByRole("heading", { name: "Last Name" }).textContent;
    let nic = getByRole("heading", { name: "NIC" }).textContent;
    let dob = getByRole("heading", { name: "DOB" }).textContent;

    expect(fname).toEqual("First Name");
    expect(lname).toEqual("Last Name");
    expect(nic).toEqual("NIC");
    expect(dob).toEqual("DOB");
  });
});
