import { getSpaces } from "../../../actions/space-actions";
import SpacesClient from "../spaces-client";

export const revalidate = 0; // Disable caching for dynamic database updates

export default async function Page() {
  const dbSpaces = await getSpaces();
  return <SpacesClient dbSpaces={dbSpaces} />;
}
