'use client';

import { Box, Text, FlexBox, FlexBoxItem } from '@mrpharderwijk/lift-off-ui';

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Box padding={40} bgColor="gray-100">
          <Text as="h1" fontSize="3xl" fontWeight="bold">
            Lift-off UI Component Library Test
          </Text>
          <Box marginTop={16}>
            <Text as="p" fontSize="base">
              This page tests the components from the @mrpharderwijk/lift-off-ui
              package.
            </Text>
          </Box>
        </Box>

        <Box padding={40} bgColor="gray-100">
          <Text as="h2" fontSize="2xl" fontWeight="semiBold">
            Box Component
          </Text>
          <Box padding={20} bgColor="yellow-100" marginTop={16}>
            <Text>This is a Box with yellow background</Text>
          </Box>
          <Box padding={20} bgColor="pink-100" marginTop={16}>
            <Text>This is a Box with pink background</Text>
          </Box>
          <Box padding={20} bgColor="gray-100" marginTop={16}>
            <Text>This is a Box with gray background</Text>
          </Box>
        </Box>

        <Box padding={40} bgColor="gray-100">
          <Text as="h2" fontSize="2xl" fontWeight="semiBold">
            Text Component
          </Text>
          <Box marginTop={16}>
            <Text as="h3" fontSize="xl" fontWeight="bold">
              Heading Text
            </Text>
          </Box>
          <Box marginTop={8}>
            <Text as="p" fontSize="base">
              This is regular paragraph text.
            </Text>
          </Box>
          <Box marginTop={8}>
            <Text as="p" fontSize="sm">
              This is small text.
            </Text>
          </Box>
        </Box>

        <Box padding={40} bgColor="gray-100">
          <Text as="h2" fontSize="2xl" fontWeight="semiBold">
            FlexBox Component
          </Text>
          <FlexBox flexDirection="row" gap={20} flexWrap="wrap" marginTop={16}>
            <FlexBoxItem>
              <Box padding={20} bgColor="yellow-100">
                <Text fontWeight="semiBold">Item 1</Text>
              </Box>
            </FlexBoxItem>
            <FlexBoxItem>
              <Box padding={20} bgColor="pink-100">
                <Text fontWeight="semiBold">Item 2</Text>
              </Box>
            </FlexBoxItem>
            <FlexBoxItem>
              <Box padding={20} bgColor="gray-100">
                <Text fontWeight="semiBold">Item 3</Text>
              </Box>
            </FlexBoxItem>
          </FlexBox>
        </Box>
      </div>
    </div>
  );
}
