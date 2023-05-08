import { useEffect } from 'react';
import { ChangePasswordForm, PersonForm } from '../../components/form/form';
import { Layout } from '../../components/layout/layout';
import { LoyoutProfile } from '../../components/layout/loyoutProfile';
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store';
import { HomeProps } from '../../type.store';
import { getCategory } from '../../utilsFunctions/GetFromAPI';
import { useJWT } from '../../utilsFunctions/useHook';

interface ProfileProps extends HomeProps {}

const Profile = ({ category }: ProfileProps) => {
    setNewCategoryState(category);
    const jwt = useJWT();
    return jwt ? (
        <LoyoutProfile>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}
            >
                <PersonForm />
                <ChangePasswordForm />
            </div>
        </LoyoutProfile>
    ) : (
        <>
            <Layout mode={'vertical'}>
                <ChangePasswordForm />
            </Layout>
        </>
    );
};

export async function getStaticProps() {
    const category = await getCategory();
    return {
        props: {
            category,
        },
    };
}

export default Profile;
