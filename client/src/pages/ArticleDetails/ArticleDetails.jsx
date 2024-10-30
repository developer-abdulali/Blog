import MainLayout from "../../components/MainLayout/MainLayout";
import BreadCrumbs from "../../components/‎BreadCrumbs‎/‎BreadCrumbs‎";

const breadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article title", link: `/blog/1` },
  // { name: "Article title", link: `/blog/${data.slug}` },
];

export const ArticleDetails = () => {
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
        </article>
      </section>
    </MainLayout>
  );
};
