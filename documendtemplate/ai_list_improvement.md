# AIできることリストページ改善実装計画書

## 基本ルール
- 指示された項目のみに修正と改善を行う
- 他の項目やページに影響を与える変更は厳禁
- 他の項目やページに影響を与える変更が必要な場合は必ず指示者に確認する

## 実装目標
AIでできることリストページを以下の機能で強化し、ユーザー体験を向上させます：

1. **アコーディオン内の記事表示を5件に制限**：初期表示を整理して見やすくする
2. **もっと見るボタンの追加**：追加の記事を表示できるようにする
3. **新着記事へのバッジ表示**：最近追加された記事を強調する
4. **自然言語検索機能**：ユーザーが探している機能を容易に見つけられるようにする
5. **検索履歴の保存**：以前の検索をワンクリックで再実行できるようにする

## 段階的実装計画
より安全に実装するため、以下の順序で実装することを推奨します：

1. まずは新着バッジと5件制限+「もっと見る」ボタンを実装
2. 次に検索機能の基本部分を実装
3. 最後に検索履歴機能を実装

## 詳細実装手順

### フェーズ1: 新着バッジと表示制限の実装

#### 1.1 状態管理の追加
```typescript
// AICapabilityListPage.tsxコンポーネント内に追加
const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({});
```

#### 1.2 マッチングロジックの拡張
```typescript
const matchCapabilitiesToGroups = (capabilities: AICapability[], groups: AICapabilityGroup[]) => {
  const groupedCapabilities = groups.map(group => {
    // スコア計算とともに新着フラグを追加
    const scoredCapabilities = capabilities.map(cap => {
      const matchResult = calculateMatchScore(cap, group);
      const publishDate = cap.publishedAt ? new Date(cap.publishedAt) : null;
      const now = new Date();
      const isNew = publishDate ? 
        (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24) <= 14 : false;
      
      // 新着ボーナス - 最近30日以内の記事はスコア加点
      let finalScore = matchResult.score;
      if (publishDate) {
        const diffDays = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays <= 30) {
          const recencyBonus = Math.max(0, 30 - diffDays) * 2;
          finalScore += recencyBonus;
        }
      }
      
      return { 
        capability: cap, 
        score: matchResult.score,
        finalScore,
        isNew
      };
    });
    
    // フィルタリング・ソート・拡張
    const matchedCapabilities = scoredCapabilities
      .filter(item => item.score >= 0.4)
      .sort((a, b) => b.finalScore - a.finalScore)
      .map(item => ({
        ...item.capability,
        isNew: item.isNew
      }));
    
    return {
      ...group,
      capabilities: matchedCapabilities.slice(0, 5), // 最初の5件
      allCapabilities: matchedCapabilities // 全件
    };
  });

  return groupedCapabilities;
};
```

#### 1.3 アコーディオンパネル内の修正
```jsx
<AccordionPanel pb={4} bg="rgba(0, 184, 212, 0.02)">
  <VStack align="stretch" spacing={4}>
    {group.capabilities && group.capabilities.length > 0 ? (
      <>
        {/* 展開状態によって表示する記事を切り替え */}
        {(expandedGroups[group.id] ? group.allCapabilities : group.capabilities).map(cap => (
          <RouterLink 
            key={cap.id}
            to={`/tools/${cap.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Box 
              p={4}
              borderRadius="md"
              bg="rgba(75, 0, 130, 0.2)"
              height="110px"
              display="flex"
              flexDirection="column"
              border="1px solid rgba(138, 43, 226, 0.2)"
              transition="all 0.3s ease"
              position="relative"
              overflow="hidden"
              _hover={{
                bg: "rgba(75, 0, 130, 0.3)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(138, 43, 226, 0.15)",
                borderColor: "rgba(138, 43, 226, 0.4)"
              }}
            >
              <HStack spacing={2} mb={3} alignItems="center">
                <Text 
                  fontSize="sm" 
                  color="cyan.300"
                  fontWeight="bold"
                  noOfLines={1}
                  flex="1"
                >
                  {cap.title}
                </Text>
                {/* 新着バッジの追加 */}
                {cap.isNew && (
                  <Tag size="sm" colorScheme="red" mr={1}>NEW</Tag>
                )}
                {cap.category && cap.category[0] && (
                  <Tag
                    size="sm"
                    variant="solid"
                    colorScheme="orange"
                    px={2}
                    py={1}
                    borderRadius="full"
                    flexShrink={0}
                  >
                    {getCategoryDisplayName(cap.category[0])}
                  </Tag>
                )}
              </HStack>
              <Text 
                fontSize="xs" 
                color="gray.200"
                lineHeight="1.4"
                noOfLines={2}
              >
                {cap.description}
              </Text>
            </Box>
          </RouterLink>
        ))}
        
        {/* もっと見るボタンの追加 - 全件が5件より多い場合のみ表示 */}
        {group.allCapabilities && group.allCapabilities.length > 5 && (
          <Button 
            size="sm" 
            variant="outline" 
            colorScheme="cyan" 
            w="full"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedGroups(prev => ({
                ...prev,
                [group.id]: !prev[group.id]
              }));
            }}
          >
            {expandedGroups[group.id] 
              ? "表示を減らす" 
              : `もっと見る (あと${group.allCapabilities.length - 5}件)`}
          </Button>
        )}
      </>
    ) : (
      <Text color="gray.400" textAlign="center" py={2}>
        該当する機能が見つかりませんでした
      </Text>
    )}
  </VStack>
</AccordionPanel>
```

### フェーズ2: 検索機能の実装

#### 2.1 追加の状態管理
```typescript
// 検索関連の状態を追加
const [searchQuery, setSearchQuery] = useState('');
const [filteredGroups, setFilteredGroups] = useState<AICapabilityGroup[]>([]);
const [isFiltering, setIsFiltering] = useState(false);
```

#### 2.2 検索スコア計算関数
```typescript
// 検索スコア計算関数
const calculateSearchScore = (group: AICapabilityGroup, query: string): number => {
  if (!query.trim()) return 100;
  
  const queryTerms = query.toLowerCase().trim().split(/\s+/);
  let totalScore = 0;
  
  queryTerms.forEach(term => {
    let termScore = 0;
    
    // タイトルマッチ
    if (group.title.toLowerCase().includes(term)) {
      termScore += 100;
    }
    
    // 説明文マッチ
    if (group.description.toLowerCase().includes(term)) {
      termScore += 50;
    }
    
    // キーワードマッチ
    if (group.keywords.some(kw => kw.toLowerCase().includes(term))) {
      termScore += 80;
    }
    
    // カテゴリマッチ
    if (group.categories.some(cat => {
      const catDisplay = CATEGORIES[cat]?.display || '';
      return catDisplay.toLowerCase().includes(term);
    })) {
      termScore += 70;
    }
    
    // 記事タイトルマッチ
    const matchingCapCount = group.allCapabilities?.filter(cap => 
      cap.title.toLowerCase().includes(term)
    ).length || 0;
    
    if (matchingCapCount > 0) {
      termScore += 40 + (matchingCapCount * 10);
    }
    
    totalScore += termScore;
  });
  
  // 全ての検索語句にある程度マッチしている場合にスコアを高くする
  if (queryTerms.length > 1 && totalScore > 0) {
    totalScore = totalScore / queryTerms.length;
  }
  
  return totalScore;
};
```

#### 2.3 検索実行関数
```typescript
// 検索実行関数
const handleSearch = (query: string) => {
  setSearchQuery(query);
  
  if (!query.trim()) {
    setIsFiltering(false);
    return;
  }
  
  // 検索スコアでグループをフィルタリング
  const scored = groupedCapabilities.map(group => ({
    group,
    score: calculateSearchScore(group, query)
  }));
  
  const filtered = scored
    .filter(item => item.score >= 40) // 閾値は調整可能
    .sort((a, b) => b.score - a.score)
    .map(item => item.group);
  
  setFilteredGroups(filtered);
  setIsFiltering(true);
};
```

#### 2.4 検索UI実装
```jsx
// 検索UIコンポーネント - ヘッダー下に追加
<Box mb={12} px={4}>
  <InputGroup size="lg" maxW="800px" mx="auto">
    <InputLeftElement pointerEvents="none">
      <SearchIcon color="gray.400" />
    </InputLeftElement>
    <Input
      placeholder="AIにやってほしいことを入力してください..."
      bg="whiteAlpha.50"
      borderColor="whiteAlpha.200"
      color="white"
      _placeholder={{ color: 'gray.400' }}
      _hover={{ borderColor: 'cyan.300' }}
      _focus={{ borderColor: 'cyan.400', boxShadow: '0 0 0 1px #00B8D4' }}
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
    {searchQuery && (
      <InputRightElement>
        <IconButton
          aria-label="検索をクリア"
          icon={<CloseIcon />}
          size="sm"
          variant="ghost"
          colorScheme="whiteAlpha"
          onClick={() => handleSearch('')}
        />
      </InputRightElement>
    )}
  </InputGroup>
  
  {/* 検索結果カウント */}
  {isFiltering && (
    <Text color="gray.300" textAlign="center" mt={4} fontSize="sm">
      {filteredGroups.length > 0 
        ? `${filteredGroups.length}件の候補が見つかりました` 
        : '検索結果が見つかりませんでした'}
    </Text>
  )}
</Box>
```

#### 2.5 グリッド表示の修正
```jsx
<Grid
  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
  gap={8}
  px={4}
>
  {[0, 1, 2].map(columnIndex => (
    <VStack key={columnIndex} spacing={8} align="stretch">
      {/* 検索フィルター中は filteredGroups を使用、そうでない場合は groupedCapabilities を使用 */}
      {(isFiltering ? filteredGroups : groupedCapabilities)
        .filter((_, index) => index % 3 === columnIndex)
        .map((group) => (
          // 以下は同じ...
        ))}
    </VStack>
  ))}
</Grid>
```

### フェーズ3: 検索履歴機能の実装

#### 3.1 検索履歴状態の追加
```typescript
// 検索履歴の状態
const [searchHistory, setSearchHistory] = useState<string[]>([]);

// 初期化時に検索履歴を読み込む
useEffect(() => {
  const savedHistory = localStorage.getItem('searchHistory');
  if (savedHistory) {
    try {
      setSearchHistory(JSON.parse(savedHistory));
    } catch (e) {
      console.error('検索履歴の読み込み失敗:', e);
    }
  }
}, []);
```

#### 3.2 検索実行関数の拡張
```typescript
// 検索履歴を保存する機能を追加
const handleSearch = (query: string) => {
  setSearchQuery(query);
  
  if (!query.trim()) {
    setIsFiltering(false);
    return;
  }
  
  // 検索語句をローカルストレージに保存
  if (query.trim() && !searchHistory.includes(query.trim())) {
    const newHistory = [query.trim(), ...searchHistory].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  }
  
  // 以下は同じ検索ロジック...
};
```

#### 3.3 検索履歴UI実装
```jsx
{/* 検索履歴表示 - 入力フォーカス時のみ表示 */}
{searchHistory.length > 0 && (
  <Box maxW="800px" mx="auto" mt={2}>
    <HStack spacing={2} wrap="wrap">
      <Text fontSize="xs" color="gray.400">最近の検索:</Text>
      {searchHistory.slice(0, 5).map((item, index) => (
        <Tag 
          key={index} 
          size="sm" 
          variant="subtle" 
          colorScheme="cyan"
          cursor="pointer"
          onClick={() => handleSearch(item)}
        >
          {item}
        </Tag>
      ))}
    </HStack>
  </Box>
)}
```

## 型定義の拡張

```typescript
// 型定義を拡張
interface AICapabilityGroup {
  // 既存のプロパティ...
  allCapabilities?: AICapability[]; // 全ての関連記事
}

interface AICapability {
  // 既存のプロパティ...
  isNew?: boolean; // 新着フラグ
}
```

## 注意点

1. **パフォーマンス考慮**: 
   - 検索やフィルタリングは計算コストが高いため、大量の記事がある場合は`useMemo`でメモ化を検討
   - スコア計算はデバッグ用コンソールログを残し、最適化の余地を検討

2. **既存機能への影響**:
   - 既存の3カラムレイアウトと記事表示は維持する
   - アコーディオン機能の動作は変更しない

3. **エラーハンドリング**:
   - LocalStorage関連の操作は try/catch で囲む
   - 日付処理では無効な日付に注意

4. **UI/UX考慮**:
   - 「もっと見る」ボタンは記事が6件以上ある場合のみ表示
   - 検索結果が0件の場合は適切なメッセージを表示

5. **テスト**:
   - 各フェーズ実装後に動作確認
   - 特に検索機能のスコアリングは実際のデータで確認と調整

## 実装後のQAチェックリスト

- [ ] アコーディオン内に5件以上の記事がある場合に「もっと見る」ボタンが表示される
- [ ] 「もっと見る」をクリックすると全ての記事が表示される
- [ ] 新着記事にNEWバッジが表示される
- [ ] 検索窓に入力すると関連するアコーディオンのみが表示される
- [ ] 検索履歴がローカルストレージに保存され、次回訪問時に表示される
- [ ] 検索履歴をクリックすると対応する検索が実行される
- [ ] 全ての機能が3カラム表示で正しく動作する
- [ ] モバイル表示でも問題なく動作する

以上の実装により、AIでできることリストページの使いやすさと情報発見性が大幅に向上します。 