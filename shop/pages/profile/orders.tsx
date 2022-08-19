import { LoyoutProfile } from "../../components/layout/loyoutProfile";
import { setNewCategoryState } from "../../components/ui-kit/button/dropDown/category.store";
import { HomeProps } from "../../type.store";
import { getCategory } from "../../utilsFunctions/GetFromAPI";

interface MyOrdersProps extends HomeProps {}

const MyOrders = ({category}: MyOrdersProps) => {
    setNewCategoryState(category);
    return (
      <LoyoutProfile>
        {/* <PersonForm /> */}
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
  
export default MyOrders