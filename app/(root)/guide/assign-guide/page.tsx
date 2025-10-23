'use client';

import { path } from '@/lib/paths'
import SkelatonLoading from '@/components/SkelatonLoading';
import Title from '@/components/Title';
import { getUserByRole } from '@/lib/graphql/Query';
import { GetUserByRoleResponse, UpdateUserRoleResponse, UserProfile } from '@/lib/graphql/type';
import { useMutation, useQuery } from '@apollo/client/react';
import Button from '@mui/material/Button';
import React, { useMemo, useState } from 'react'
import CustomAutoComplete from '@/components/FormComponents/CustomAutoComplete';
import { UPDATE_USER_ROLE } from '@/lib/graphql/mutation';
import { toast } from 'sonner';
const AssignGuide = () => {
    const { loading, data } = useQuery<GetUserByRoleResponse>(getUserByRole, {
        variables: {
            role: "User"
        }
    });
    const [mutation, {
        loading: isAssignRoleLoading,
        error: assignGuideError
    }] = useMutation<UpdateUserRoleResponse>(UPDATE_USER_ROLE,{
        refetchQueries: [getUserByRole]
    })
    const [selectedUser, setSelectedUser] = useState<UserProfile[]>([]);
    const userLists = useMemo(() => {
        return data?.getUserByRole.users
    }, [data])

    if (loading || isAssignRoleLoading) {
        return <SkelatonLoading />
    }

    return (
        <div className='p-2 max-w-full  md:max-w-4xl'>
            <div className='card_header'>
                <Title title='Assign Guide' btnTitle='Guides' path={path.guide.list} />
            </div>
            <div className='card_details mt-5'>
                <div className='flex flex-row items-center gap-4'>
                    {assignGuideError && <div className='error'>{assignGuideError.message}</div>}
                    <CustomAutoComplete
                        id={1}
                        onChange={(value) => {
                            setSelectedUser(value);
                        }}
                        sx={{ width: "80%" }}
                        selectedOptionId='_id'

                        optionKey={'username'}
                        options={userLists ?? []}
                        label='Select Users'
                        name={'users'}
                        isLoading={false}
                        isMultiple={true}
                        isRequired={true}
                        value={selectedUser}
                    />

                    <Button onClick={async () => {
                        const response = await mutation({
                            variables: {
                                type: selectedUser?.map((user) => user._id)
                            }
                        })

                        if (response.data?.updateUserRole.status) {
                            toast('Assign guide successfully');
                            setSelectedUser([]);
                        }
                    }} disabled={selectedUser.length == 0} variant='contained' className='add-form-butto w-1/6'>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AssignGuide