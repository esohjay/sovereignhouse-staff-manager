import React, { useEffect } from "react";
import { useGetAllExpensesQuery } from "../../api/expenses";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../components/Btn";

function AllExpenses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentData, isError, isFetching, isLoading, isSuccess } =
    useGetAllExpensesQuery();
  return (
    <article className="w-full p-5 md:p-10">
      <article className="w-full bg-white  rounded-md shadow-md">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      s/n
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 first-letter:uppercase"
                    >
                      fullname
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 first-letter:uppercase"
                    >
                      amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 first-letter:uppercase"
                    >
                      status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 first-letter:uppercase"
                    >
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.map((expense, i) => (
                    <tr
                      key={expense.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i + 1}
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 cursor-pointer"
                        onClick={() => navigate(`${expense.id}`)}
                      >
                        {expense.user.fullName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {expense.amount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {expense.status}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-x-2">
                          <Btn
                            text={"view"}
                            onClick={() => navigate(`${expense.id}`)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </article>
    </article>
  );
}

export default AllExpenses;
