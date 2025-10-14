import React, { memo, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Box } from '@chakra-ui/react';

interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (props: { index: number; style: React.CSSProperties; data: T }) => React.ReactNode;
  width?: string | number;
  overscanCount?: number;
  className?: string;
}

/**
 * 仮想化されたリストコンポーネント
 * 単一責任: 大量データの効率的なレンダリング
 */
const VirtualizedList = memo(<T,>({
  items,
  height,
  itemHeight,
  renderItem,
  width = '100%',
  overscanCount = 5,
  className
}: VirtualizedListProps<T>) => {
  // アイテムレンダラーをメモ化
  const ItemRenderer = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index];
    if (!item) return null;
    
    return renderItem({ index, style, data: item });
  }, [items, renderItem]);

  // アイテムデータをメモ化
  const itemData = useMemo(() => items, [items]);

  return (
    <Box className={className}>
      <List
        height={height}
        itemCount={items.length}
        itemSize={itemHeight}
        itemData={itemData}
        width={width}
        overscanCount={overscanCount}
      >
        {ItemRenderer}
      </List>
    </Box>
  );
});

// TypeScript用の型アサーション
VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;

