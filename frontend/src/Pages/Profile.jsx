import React, { useEffect, useState } from 'react';
import Service from '../utils/http';
import { Avatar, Center, Text, Stack, Paper } from '@mantine/core';

const service = new Service();

export default function Profile() {
  const [profileData, setProfileData] = useState(null);

  async function getProfileData() {
    let data = await service.get("user/me");
    setProfileData(data);
    console.log(data);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div style={{ backgroundColor: "#fff0f6", minHeight: "100vh" }}>
      <Stack
        h={400}
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="xs"
      >
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          withBorder
          bg="#fff0f6" 
          style={{ minWidth: 350 }}
        >
          <Center>
            <Avatar
              variant="light"
              radius="xl"
              size="xl"
              color="pink"
            >
              {profileData?.name?.[0]?.toUpperCase()}
            </Avatar>
          </Center>

          <Text ta="center" tt="capitalize" fw={700} size="lg" c="pink">
            🌸 {profileData?.name}
          </Text>

          <Text ta="center" tt="lowercase" c="grape">
            {profileData?.email}
          </Text>
          <Text ta="center" size="sm" mt="xs" c="dimmed">User ID: {profileData?._id}</Text>

          <Text ta="center" size="sm" c="dimmed" mt="xs">
            <strong>Account Created:</strong>{" "}
            {new Date(profileData?.createdAt).toLocaleString()}
          </Text>
        </Paper>
      </Stack>
    </div>
  );
}