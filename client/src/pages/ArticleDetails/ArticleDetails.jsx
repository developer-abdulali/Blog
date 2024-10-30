import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout/MainLayout";
import BreadCrumbs from "../../components/‎BreadCrumbs‎/‎BreadCrumbs‎";
import images from "../../constants/images";
import SuggestedArticles from "./container/SuggestedArticles";
import CommentsContainer from "../../components/CommentsContainer/CommentsContainer";

const breadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article title", link: `/blog/1` },
  // { name: "Article title", link: `/blog/${data.slug}` },
];

const postsData = [
  {
    _id: 1,
    title: "Help children get better education",
    image: images.Post1Image,
    createdAt: "2023-01-28T15:00:00Z",
  },
  {
    _id: 2,
    title: "Help children get better education",
    image: images.Post1Image,
    createdAt: "2023-01-28T15:00:00Z",
  },
  {
    _id: 3,
    title: "Help children get better education",
    image: images.Post1Image,
    createdAt: "2023-01-28T15:00:00Z",
  },
  {
    _id: 4,
    title: "Help children get better education",
    image: images.Post1Image,
    createdAt: "2023-01-28T15:00:00Z",
  },
];

const tagsData = [
  "Medical",
  "Health",
  "Education",
  "Technology",
  "Sports",
  "Business",
];

export const ArticleDetails = () => {
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className="rounded-xl w-full"
            src={images.Post1Image}
            alt="post pic"
          />
          <div className="mt-4 flex gap-2">
            {/* {data?.categories.map((category) => ( */}
            <Link
              to={`/`}
              //   to={`/blog?category=${category.name}`}
              className="text-primary text-sm font-roboto inline-block md:text-base"
            >
              Education
              {/* {category.name} */}
            </Link>
            {/* ))} */}
          </div>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            Help children get better education
            {/* {data?.title} */}
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
              temporibus unde quisquam necessitatibus facilis ducimus minima,
              nihil repellendus sed suscipit, ex sint amet debitis a quidem,
              dolore commodi veritatis accusamus itaque nulla optio iusto. Iusto
              quam tempora ducimus maiores repudiandae dolore commodi vel
              recusandae, ullam qui quod incidunt neque adipisci.
            </p>
          </div>
          {/* comments section */}
          <CommentsContainer className="mt-10" loggedInUserId="a" />
        </article>
        {/* suggested articles */}
        <SuggestedArticles
          header="Latest Articles"
          posts={postsData}
          tags={tagsData}
          className="mt-8 lg:mt-0 lg:max-w-xs"
        />
      </section>
    </MainLayout>
  );
};
