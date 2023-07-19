import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const getBlogsData = async () => {  
  const blogData = await fetch("https://cdn.contentful.com/spaces/c0th3n6exx26/entries?access_token=iHqBocJFc2ywMe2tczAm5SFxt-eNoUzYwN6LRsh9GrI&content_type=blog")

  try {
    if(!blogData.ok){
      throw new Error("Failed to load Data")
    }
    
    return blogData.json()

  } catch (error) {
    console.log(error)
  }

} 

const Blogs = async () => {
  const blogsData = await getBlogsData()
  console.log(blogsData)
  return (
    <div>
     <div> 
      {blogsData.items.map((blog:any) => {
        return (
          <div key={blog.sys.id}>
            <h1>{blog.fields.title}</h1>
            <p>{documentToReactComponents(blog.fields.body)}</p>
            <img className="h-48 w-full" src={blogsData.includes.Asset[0].fields.file.url} alt="" />
          </div>
        )
      })} 
     </div>
    </div>
  )
}

export default Blogs