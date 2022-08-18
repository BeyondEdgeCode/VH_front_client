import { HomeProps } from "..";
import { LoyoutProfile } from "../../components/layout/loyoutProfile"
import { setNewCategoryState } from "../../components/ui-kit/button/dropDown/category.store";
import { getCategory } from "../../utilsFunctions/GetFromAPI";

interface ProfileProps extends HomeProps {}

const Profile = ({category}: ProfileProps) => {
    setNewCategoryState(category);
    return (
      <LoyoutProfile>

      </LoyoutProfile>
    )
}

export async function getStaticProps() {
  const category = await getCategory();
  return {
    props: {
      category,
    },
  }
}
  
export default Profile