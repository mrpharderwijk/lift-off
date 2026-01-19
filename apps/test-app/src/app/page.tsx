'use client'

import {
  Body,
  Box,
  FlexBox,
  FlexBoxItem,
  Heading,
  Text,
} from '@mrpharderwijk/lift-off-ui'

export default function Index() {
  const bla = 'hello'

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Box padding={40} bg-color="quaternary">
          <Text tag="span" font-size="title-lg" font-weight="bold">
            Lift-off UI Component Library Test
          </Text>
          <Box margin-top={16}>
            <Text font-size="base-sm">
              This page tests the components from the @mrpharderwijk/lift-off-ui
              package.
            </Text>
          </Box>
        </Box>

        <Box padding={40} bg-color="tertiary">
          <Heading like="h1-semibold" tag="h2">
            Box Component
          </Heading>
          <Box padding={20} bg-color="deco" margin-top={16}>
            <Text>This is a Box with deco background</Text>
          </Box>
          <Box padding={20} bg-color="info" margin-top={16}>
            <Text>This is a Box with info background</Text>
          </Box>
          <Box padding={20} bg-color="primary-core" margin-top={16}>
            <Text>This is a Box with primary core background</Text>
          </Box>
        </Box>

        <Box padding={40} bg-color="secondary-core">
          <Heading like="h2-base" tag="h2">
            Text Component
          </Heading>
          <Box margin-top={16}>
            <Body>Heading Text</Body>
          </Box>
          <Box margin-top={8}>
            <Body>This is regular paragraph text.</Body>
          </Box>
          <Box margin-top={8}>
            <Body>This is small text.</Body>
          </Box>
        </Box>

        <Box padding={40} bg-color="secondary">
          <Body>FlexBox Component</Body>
          <FlexBox
            flex-direction="row"
            gap={20}
            flex-wrap="wrap"
            margin-top={16}
          >
            <FlexBoxItem>
              <Box padding={20} bg-color="warning">
                <Body font-weight="semibold">Item 1</Body>
              </Box>
            </FlexBoxItem>
            <FlexBoxItem>
              <Box padding={20} bg-color="danger">
                <Body font-weight="semibold">Item 2</Body>
              </Box>
            </FlexBoxItem>
            <FlexBoxItem>
              <Box padding={20} bg-color="secondary">
                <Body font-weight="semibold">Item 3</Body>
              </Box>
            </FlexBoxItem>
          </FlexBox>
        </Box>
      </div>
    </div>
  )
}
