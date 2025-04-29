import { useEffect, useRef, useState } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css"; // You can use other Flatpickr themes
import SingleSelectFilterDropdown from "../Leads/SingleSelectFilterDropdown";
import { IoCalendarOutline } from "react-icons/io5";

import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTeams } from "../../Store/teamsSlice/teamsSlice";

const ItemsFilter = ({
  middleFilterTitle = "Type",
  resetFilters = () => {},
  setFilter,
  search,
  allItems,
  noAssign = true,
}) => {
  const dispatch = useDispatch();
  // Date From - To
  const flatpickrRef = useRef(null);
  const [resetDropdown, setResetDropdown] = useState(false);

  const { allTeams } = useSelector((state) => state.teams);
  useEffect(() => {
    dispatch(fetchAllTeams());
  }, [dispatch]);

  const initialValues = {
    assigned: null,
    service: null,
    dateRange: [],
  };

  const handleResetFilters = (resetForm) => {
    dispatch(resetFilters());
    setResetDropdown(true);
    resetForm(); // Reset the form to its initial values
    if (flatpickrRef.current && flatpickrRef.current.flatpickr) {
      flatpickrRef.current.flatpickr.clear();
    }
  };

  const onSubmit = (values) => {
    dispatch(
      setFilter({
        date_from: values?.dateRange?.[0],
        date_to: values?.dateRange?.[1],
        assigned_to: values.assigned,
        service: values.service,
        search: search,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg w-full shadow-md p-4">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ setFieldValue, values, resetForm }) => (
          <Form>
            <div className=" flex gap-3 mb-1 items-center">
              <h2 className="text-lg font-bold">Filter by</h2>
              {/* TODO 
          Reset The Filters
        */}
              <button
                type="submit"
                className="rounded-lg   hover:bg-[#3e79cb] text-white bg-customBlue   px-2 py-px">
                Search
              </button>
              <button
                type="reset"
                onClick={() => handleResetFilters(resetForm)}
                className=" rounded-lg border-borderGray hover:bg-slate-100 border px-2 py-px">
                Reset
              </button>
            </div>
            <div className=" grid md:grid-cols-2  grid-cols-1 lg:grid-cols-3 gap-5 justify-between  ">
              {/* Source */}
              <div>
                <Field name="service">
                  {({ field }) => (
                    <SingleSelectFilterDropdown
                      {...field}
                      filters={allItems}
                      placeholder="Items"
                      width="w-full"
                      setResetDropdown={setResetDropdown}
                      reset={resetDropdown} // Pass reset state here
                      setFieldValues={(value) =>
                        setFieldValue("service", value)
                      }
                    />
                  )}
                </Field>
              </div>

              {/* // Assigned */}
              <div>
                {noAssign && (
                  <Field name="assigned">
                    {({ field }) => (
                      <SingleSelectFilterDropdown
                        {...field}
                        filters={allTeams}
                        placeholder="Assigned"
                        width="w-full"
                        setResetDropdown={setResetDropdown}
                        reset={resetDropdown} // Pass reset state here
                        setFieldValues={(value) =>
                          setFieldValue("assigned", value)
                        }
                      />
                    )}
                  </Field>
                )}{" "}
              </div>

              <div className="relative">
                <Flatpickr
                  ref={flatpickrRef}
                  value={values.dateRange || []}
                  onChange={(dates) => {
                    const formattedDates = dates.map(
                      (date) => date.toISOString().split("T")[0]
                    ); // Converts to "YYYY-MM-DD"
                    setFieldValue("dateRange", formattedDates);
                  }}
                  placeholder="Select Date From - To"
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                  }}
                  className="input border border-borderGray placeholder:text-primary  rounded-lg py-2  w-full min-w-[200px] text-center "
                />
                <label
                  htmlFor="te"
                  className=" absolute top-[25%] right-[20px] z-10">
                  <IoCalendarOutline />
                </label>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ItemsFilter;
