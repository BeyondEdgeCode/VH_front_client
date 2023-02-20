import { ChangePasswordForm } from '../../components/form/form'
import { LoyoutProfile } from '../../components/layout/loyoutProfile'
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store'
import { HomeProps } from '../../type.store'
import { getCategory } from '../../utilsFunctions/GetFromAPI'

interface ChangePasswordProps extends HomeProps {}

const ChangePassword = ({ category }: ChangePasswordProps) => {
    setNewCategoryState(category)

    return (
        <LoyoutProfile>
            <ChangePasswordForm />
        </LoyoutProfile>
    )
}

export async function getStaticProps() {
    const category = await getCategory()
    return {
        props: {
            category,
        },
    }
}

export default ChangePassword
