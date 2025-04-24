import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';

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
      <TouchableOpacity
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
      </TouchableOpacity>
    );

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 2; i <= totalPages; i++) {
        pages.push(
          <TouchableOpacity
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
          </TouchableOpacity>
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
          <TouchableOpacity
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
          </TouchableOpacity>
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
          <TouchableOpacity
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
          </TouchableOpacity>
        );
      }
    }

    return pages;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.arrowButton, { opacity: currentPage === 1 ? 0.5 : 1 }]}
        onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IconSymbol name="chevron.left" size={20} color={theme.colors.text} />
      </TouchableOpacity>
      
      <View style={styles.pageContainer}>
        {renderPageNumbers()}
      </View>

      <TouchableOpacity
        style={[styles.arrowButton, { opacity: currentPage === totalPages ? 0.5 : 1 }]}
        onPress={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IconSymbol name="chevron.right" size={20} color={theme.colors.text} />
      </TouchableOpacity>
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
  arrowButton: {
    padding: 8,
  },
  ellipsis: {
    fontSize: 14,
    marginHorizontal: 4,
  },
});

export default Pagination; 