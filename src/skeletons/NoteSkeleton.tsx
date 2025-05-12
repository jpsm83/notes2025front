import ContentLoader from "react-content-loader"

const NoteSkeleton = (props: any) => (
  <ContentLoader 
    speed={2}
    width={240}
    height={134}
    viewBox="0 0 240 134"
    backgroundColor="#f3f3f3"
    foregroundColor="#ebebeb"
    {...props}
  >
    <rect x="22" y="67" rx="3" ry="3" width="204" height="24" /> 
    <rect x="22" y="10" rx="3" ry="3" width="204" height="49" /> 
    <rect x="22" y="103" rx="3" ry="3" width="67" height="22" /> 
    <rect x="190" y="103" rx="0" ry="0" width="36" height="21" />
  </ContentLoader>
)

export default NoteSkeleton