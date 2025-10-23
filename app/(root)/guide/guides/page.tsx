'use client'
import { User } from 'lucide-react';
import Error from '@/components/FormComponents/Error'
import SkelatonLoading from '@/components/SkelatonLoading'
import { GET_ALL_GUIDES } from '@/lib/graphql/Query'
import { Getallguides, RevertGuideToUserRoleResponse } from '@/lib/graphql/type'
import { useMutation, useQuery } from '@apollo/client/react'
import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import Title from '@/components/Title'
import { path } from '@/lib/paths'
import { REVERT_GUIDE_TO_USER } from '@/lib/graphql/mutation';

const Guides = () => {
    const { loading, error, data, refetch } = useQuery<Getallguides>(GET_ALL_GUIDES);
    const [mutation, {
        loading: isBackToUserLoading,
        error: backToUserMutationError
    }] = useMutation<RevertGuideToUserRoleResponse>(REVERT_GUIDE_TO_USER, {
        refetchQueries: [GET_ALL_GUIDES]
    });

    useEffect(() => {
     refetch()
    }, [])
    const guidesList = useMemo(() => {
        return data?.getallguides.users ?? []
    }, [data])

    if (loading || isBackToUserLoading) {
        return <SkelatonLoading />
    }

    return (

        <div className='p-2 max-w-full  md:max-w-4xl'>
            <div className='card_header'>
                <Title title='Guide' btnTitle='Assign Guides' path={path.guide.assign} />
            </div>
            <div className='card_details mt-5'>
                {error && <Error error={error?.message} />}
                {backToUserMutationError && <Error error={backToUserMutationError?.message} />}

                <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            {guidesList.length == 0 ? <Typography>No Data Found</Typography> : guidesList?.map((guide, index) => (
                                <Grid

                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 4,
                                        lg: 4
                                    }}
                                    key={index}
                                >
                                    <Card
                                        sx={{
                                            height: '100%',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 2,
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 2.5 }}>
                                            {/* Header Section */}
                                            <Box sx={{ mb: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '1rem',
                                                        mb: 1,
                                                        color: '#1a1a1a'
                                                    }}
                                                >
                                                    {guide.username}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    title='Back to User'
                                                    onClick={async () => {
                                                        await mutation({
                                                            variables: {
                                                                type: guide._id
                                                            }
                                                        })
                                                    }}
                                                    sx={{
                                                        fontSize: '0.875rem',
                                                        color: '#666',
                                                        textTransform: 'none',
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                            color: '#1976d2'
                                                        }
                                                    }}
                                                >
                                                    <User size={16} style={{ marginLeft: 4 }} />
                                                </IconButton>
                                            </Box>

                                            {/* Assignment Info Section */}
                                            <Box sx={{
                                                pt: 2,
                                                borderTop: '1px solid #f0f0f0'
                                            }}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    gap: 1,
                                                    mb: 1,
                                                    p: 1.5,
                                                    flexDirection: "column",

                                                    backgroundColor: '#f8f9fa',
                                                    borderRadius: 1,
                                                    border: '1px solid #e9ecef'
                                                }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#495057',
                                                            fontSize: '0.875rem',
                                                            fontWeight: 500,
                                                            minWidth: 'fit-content'
                                                        }}
                                                    >
                                                        Assign By:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#212529',
                                                            fontSize: '0.875rem',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {guide.assignguideby.username}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: "column",
                                                    gap: 1,
                                                    p: 1.5,
                                                    backgroundColor: '#f8f9fa',
                                                    borderRadius: 1,
                                                    border: '1px solid #e9ecef'
                                                }}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#495057',
                                                            fontSize: '0.875rem',
                                                            fontWeight: 500,
                                                            minWidth: 'fit-content'
                                                        }}
                                                    >
                                                        Assign Date:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#212529',
                                                            fontSize: '0.875rem',
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {dayjs(guide.assignguidedate).format('DD-MM-YYYY')}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}

export default Guides