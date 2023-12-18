import React from 'react';

import {Card, Stack, Skeleton} from "@mui/material";

export function TopicSectionsCardLoading() {
    return (
        <Card sx={{
            padding: 2,
            marginTop: 2
        }}>
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <Skeleton
                    animation="wave"
                    variant="text"
                    width={120}
                />

                <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                >
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={30}
                        height={30}
                        sx={{
                            borderRadius: '50px'
                        }}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={30}
                        height={30}
                        sx={{
                            borderRadius: '50px'
                        }}
                    />
                </Stack>
            </Stack>
        </Card>
    );
}
