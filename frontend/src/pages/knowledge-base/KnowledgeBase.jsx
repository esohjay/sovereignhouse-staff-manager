import React from "react";

function KnowledgeBase() {
  // const article = [{}]
  return (
    <article className="">
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
                {/* <tbody>
                {currentData?.map((article, i) => {
                  const day = setDay(article.dayOfTheWeek);
                  return (
                    <tr
                      key={article.id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        <Link
                          to={`${article.id}`}
                          className="first-letter:uppercase"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {article.venue}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">{day}</td>
                      <td className="whitespace-nowrap px-6 py-4 first-letter:uppercase">
                        {article.studentCategory}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {article.duration}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex items-center gap-x-2">
                        <Link
                          to={`${article.id}`}
                          className="text-mainColor text-lg"
                        >
                          <FaRegEye />
                        </Link>
                        <Link
                          to={`${article.id}/edit`}
                          className="text-warning text-lg"
                        >
                          <FaEdit />
                        </Link>
                        <button className="bg-transparent text-lg text-danger ">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default KnowledgeBase;
