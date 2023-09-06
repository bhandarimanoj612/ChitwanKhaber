import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { format } from "timeago.js";

function RelatedArticles({ postDetails, currentArticle, category }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (postDetails && currentArticle && category) {
      const currentCategory = postDetails.filter(
        (article) => article.category === category
      );
      const relateds = currentCategory.filter(
        (article) => article.title !== currentArticle
      );
      setRelated(relateds);
    }
  }, [postDetails, currentArticle, category]);

  return (
    <div className="flex flex-col gap-4 px-4 py-4 w-full border-t-[1px] mb-10">
      <h1 className="text-dark flex flex-col font-bold font-karma text-sm sm:text-base md:text-2xl dark:text-white ">
        सम्बन्धित लेखहरू
        <div className="bg-dark w-[3.3rem] sm:w-[3.8rem] md:w-[4.7rem] h-[.3rem]" />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {related.length === 0 || related === undefined
          ? ""
          : related?.slice(0, 4).map((val) => (
              <>
                <Fade>
                  <div
                    key={val._id}
                    className="flex flex-col justify-between rounded-md overflow-hidden "
                  >
                    <div className="h-[9rem]">
                      <img
                        src={val.picture}
                        alt="related article 1"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col justify-between px-2 gap-1 mt-2 sm:gap-2">
                      <span className="text-base sm:text-md font-bold line-clamp-2 font-karma leading-relaxed tracking-wide dark:text-white">
                        {val.title}
                      </span>
                      <p className="text-xs font-domine text-gray-400 dark:text-yellow-200">
                        {val.postedBy.username} | {format(val.createdAt)}
                      </p>
                    </div>
                  </div>
                </Fade>
              </>
            ))}
      </div>
    </div>
  );
}

export default RelatedArticles;
