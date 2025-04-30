import { StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const theme = useTheme();

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    pages.push(
      <Pressable
        key={1}
        style={[
          styles.pageButton,
          currentPage === 1 && { backgroundColor: theme.colors.primary },
        ]}
        onPress={() => onPageChange(1)}
      >
        <ThemedText style={[
          styles.pageText,
          currentPage === 1 && { color: theme.colors.surface }
        ]}>1</ThemedText>
      </Pressable>
    );

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 2; i <= totalPages; i++) {
        pages.push(
          <Pressable
            key={i}
            style={[
              styles.pageButton,
              currentPage === i && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => onPageChange(i)}
          >
            <ThemedText style={[
              styles.pageText,
              currentPage === i && { color: theme.colors.surface }
            ]}>{i}</ThemedText>
          </Pressable>
        );
      }
    } else {
      // Show ellipsis and last few pages
      if (currentPage > 3) {
        pages.push(
          <ThemedText key="ellipsis1" style={[styles.ellipsis, { color: theme.colors.text }]}>...</ThemedText>
        );
      }

      // Show current page and surrounding pages
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
        pages.push(
          <Pressable
            key={i}
            style={[
              styles.pageButton,
              currentPage === i && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => onPageChange(i)}
          >
            <ThemedText style={[
              styles.pageText,
              currentPage === i && { color: theme.colors.surface }
            ]}>{i}</ThemedText>
          </Pressable>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <ThemedText key="ellipsis2" style={[styles.ellipsis, { color: theme.colors.text }]}>...</ThemedText>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(
          <Pressable
            key={totalPages}
            style={[
              styles.pageButton,
              currentPage === totalPages && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => onPageChange(totalPages)}
          >
            <ThemedText style={[
              styles.pageText,
              currentPage === totalPages && { color: theme.colors.surface }
            ]}>{totalPages}</ThemedText>
          </Pressable>
        );
      }
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, currentPage === 1 ? styles.buttonDisabled : { opacity: 1 }]}
        onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} color={theme.colors.text} />
      </Pressable>
      
      <View style={styles.pageContainer}>
        {renderPageNumbers()}
      </View>

      <Pressable
        style={[styles.button, currentPage === totalPages ? styles.buttonDisabled : { opacity: 1 }]}
        onPress={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} color={theme.colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageText: {
    fontSize: 14,
  },
  button: {
    padding: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  ellipsis: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  pageInfo: {
    fontSize: 14,
  },
});

export default Pagination; 