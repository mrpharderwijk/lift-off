import { Box, FlexBox } from '@/components/layout';
import { Display } from '@/components/layout/display/display';
import { Text } from '@/components/core/typography/text/text';
import { PropsWithChildren, ReactElement } from 'react';

type BreakPointBoxProps = PropsWithChildren;

export function BreakPointBox({ children }: BreakPointBoxProps): ReactElement {
  return (
    <Box
      padding={4}
      position="relative"
      height={96}
      data-testid="break-point-box"
    >
      <Box border="px" border-color="primary" border-radius="md" height="full">
        {children}
        <Box
          position="absolute"
          right={0}
          bottom={0}
          bg-color="secondary"
          border-radius-tl="md"
          border-radius-br="md"
        >
          <FlexBox flex-direction="col" padding={2}>
            <FlexBox.Item>
              <Text font-size="base-sm">Current Breakpoint:</Text>
            </FlexBox.Item>
            <FlexBox.Item>
              <Text font-size="base-xs" text-align="right">
                <Box display="flex" align-items="end" width="full">
                  <Display show-xs>XS</Display>
                  <Display show-sm>SM</Display>
                  <Display show-md>MD</Display>
                  <Display show-lg>LG</Display>
                  <Display show-xl>XL</Display>
                  <Display show-2xl>2XL</Display>
                  <Display show-3xl>3XL</Display>
                </Box>
              </Text>
            </FlexBox.Item>
          </FlexBox>
        </Box>
      </Box>
    </Box>
  );
}
