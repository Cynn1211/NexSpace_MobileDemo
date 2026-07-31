import { renderV11 } from "./v11-renderer";

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: renderV11("/") }} />;
}
