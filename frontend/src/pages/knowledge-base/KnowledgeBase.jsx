import React from "react";
import Btn from "../../components/Btn";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllKnowledgeBaseQuery } from "../../api/staff/knowlege-base-api";

function KnowledgeBase() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentData, isError, isFetching, error, isSuccess } =
    useGetAllKnowledgeBaseQuery();
  return (
    <article className="">
      <div className="grid p-5 grid-cols-2 gap-3 mb-5 font-bold w-fit">
        <Btn
          text={"all"}
          onClick={() => navigate(`/vms/${id}/knowledge-base`)}
        />
        <Btn
          text={"add"}
          color={2}
          onClick={() => navigate(`/vms/${id}/knowledge-base/add`)}
        />
      </div>
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      s/n
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Article name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Group
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date published
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.length > 0 ? (
                    currentData?.map((article, i) => {
                      return (
                        <tr
                          key={article.id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                            <a
                              href={`${article.link}`}
                              className="first-letter:uppercase"
                              target="_blank"
                            >
                              {article.name}
                            </a>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                            {article.group}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                            {article.createdAt}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="p-5 w-full">
                      <td colSpan={4} className="text-center text-xl py-6 ">
                        No record found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default KnowledgeBase;
