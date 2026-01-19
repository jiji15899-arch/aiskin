/**
 * 정부지원금 찾기 - Custom JavaScript
 * 
 * @package Subsidy_Finder
 */

// 페이지네이션 관련 변수
var supportFinderAllResults = [];
var supportFinderOriginalResults = [];
var supportFinderCurrentPage = 1;
var supportFinderItemsPerPage = 9;
var supportFinderCheckInterval;
var supportFinderCurrentSort = 'default';

// 마감된 지원금인지 확인하는 함수
function isExpiredDeadline(deadline) {
    if (!deadline) return false;
    
    var cleanDeadline = deadline.trim();
    console.log('마감일 체크:', cleanDeadline);
    
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (cleanDeadline === '마감됨' || cleanDeadline === '마감' || 
        cleanDeadline === '종료됨' || cleanDeadline === '종료' || 
        cleanDeadline.includes('마감됨') || cleanDeadline.includes('종료') ||
        cleanDeadline.includes('마감')) {
        console.log('마감된 지원금 발견:', cleanDeadline);
        return true;
    }
    
    if (cleanDeadline.match(/D-(\d+)/)) {
        return false;
    }
    
    if (cleanDeadline === '상시' || cleanDeadline === '수시' || cleanDeadline === '연중') {
        return false;
    }
    
    var dateMatch = cleanDeadline.match(/(\d{4})[-.](\d{1,2})[-.](\d{1,2})/);
    if (dateMatch) {
        var deadlineDate = new Date(parseInt(dateMatch[1]), parseInt(dateMatch[2]) - 1, parseInt(dateMatch[3]));
        deadlineDate.setHours(23, 59, 59, 999);
        var isExpired = deadlineDate < today;
        if (isExpired) {
            console.log('과거 날짜로 마감된 지원금:', cleanDeadline);
        }
        return isExpired;
    }
    
    return false;
}

// 마감된 지원금을 완전히 제외하는 필터 함수
function filterOutExpiredSupports(results) {
    return results.filter(function(result) {
        var expired = isExpiredDeadline(result.deadline);
        if (expired) {
            console.log('마감된 지원금 제외:', result.title, '마감일:', result.deadline);
        }
        return !expired;
    });
}

// 정렬 함수
function supportFinderSortResults(sortType) {
    supportFinderCurrentSort = sortType;
    supportFinderCurrentPage = 1;
    
    document.querySelectorAll('.support-finder-filter-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    document.getElementById('supportFinder' + sortType.charAt(0).toUpperCase() + sortType.slice(1) + 'Sort').classList.add('active');
    
    var activeResults = filterOutExpiredSupports(supportFinderOriginalResults);
    
    if (sortType === 'default') {
        supportFinderAllResults = activeResults.slice();
    } else if (sortType === 'deadline') {
        supportFinderAllResults = activeResults.slice().sort(function(a, b) {
            var dateA = supportFinderParseDate(a.deadline);
            var dateB = supportFinderParseDate(b.deadline);
            return dateA - dateB;
        });
    } else if (sortType === 'amount') {
        supportFinderAllResults = activeResults.slice().sort(function(a, b) {
            var amountA = supportFinderParseAmount(a.amount);
            var amountB = supportFinderParseAmount(b.amount);
            return amountB - amountA;
        });
    }
    
    var resultsCount = document.getElementById('supportFinderResultsCount');
    if (resultsCount) {
        resultsCount.textContent = supportFinderAllResults.length + '개 지원금';
    }
    
    if (supportFinderAllResults.length <= supportFinderItemsPerPage) {
        supportFinderDisplayCurrentPageNoPages();
    } else {
        supportFinderDisplayCurrentPage();
        supportFinderUpdatePagination();
    }
}

// 페이지네이션 없이 결과만 표시하는 함수
function supportFinderDisplayCurrentPageNoPages() {
    var resultsGrid = document.getElementById('supportFinderSupportGrid');
    if (!resultsGrid) return;
    
    var cardsHTML = '';
    for (var i = 0; i < supportFinderAllResults.length; i++) {
        var result = supportFinderAllResults[i];
        if (result.originalHTML) {
            cardsHTML += result.originalHTML;
        }
    }
    
    resultsGrid.innerHTML = cardsHTML;
}

// 날짜 파싱 함수
function supportFinderParseDate(dateStr) {
    if (!dateStr) return new Date('9999-12-31');
    
    var cleanDate = dateStr.trim();
    
    if (cleanDate.match(/D-(\d+)/)) {
        var days = parseInt(cleanDate.match(/D-(\d+)/)[1]);
        var today = new Date();
        var futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
        return futureDate;
    }
    
    if (cleanDate === '상시' || cleanDate === '수시' || cleanDate === '연중') {
        return new Date('9999-12-31');
    }
    
    if (cleanDate.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
        var parts = cleanDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
        if (parts) {
            return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]));
        }
    }
    
    if (cleanDate.match(/\d{4}\.\d{1,2}\.\d{1,2}/)) {
        var parts = cleanDate.match(/(\d{4})\.(\d{1,2})\.(\d{1,2})/);
        if (parts) {
            return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]));
        }
    }
    
    return new Date('9999-12-31');
}

// 금액 파싱 함수
function supportFinderParseAmount(amountStr) {
    if (!amountStr) return 0;
    
    var cleanAmount = amountStr.replace(/[^0-9]/g, '');
    if (!cleanAmount) return 0;
    
    var amount = parseInt(cleanAmount);
    
    if (amountStr.includes('억')) {
        amount = amount * 100000000;
    } else if (amountStr.includes('천만')) {
        amount = amount * 10000000;
    } else if (amountStr.includes('만')) {
        amount = amount * 10000;
    }
    
    return amount;
}

// 주기적으로 검색 결과 확인
function supportFinderStartChecking() {
    if (supportFinderCheckInterval) {
        clearInterval(supportFinderCheckInterval);
    }
    
    supportFinderCheckInterval = setInterval(function() {
        var resultsGrid = document.getElementById('supportFinderSupportGrid');
        var resultsCount = document.getElementById('supportFinderResultsCount');
        
        if (resultsGrid && resultsCount) {
            var cards = Array.from(resultsGrid.children);
            var countText = resultsCount.textContent;
            
            if (cards.length > 0 && 
                !cards[0].classList.contains('support-finder-no-results') &&
                countText.includes('개 지원금')) {
                
                if (cards.length <= supportFinderItemsPerPage) {
                    supportFinderApplyFilterOnly();
                } else {
                    supportFinderApplyPagination();
                }
                clearInterval(supportFinderCheckInterval);
            }
        }
    }, 500);
    
    setTimeout(function() {
        if (supportFinderCheckInterval) {
            clearInterval(supportFinderCheckInterval);
        }
    }, 10000);
}

// 페이지네이션 없이 필터만 적용하는 함수
function supportFinderApplyFilterOnly() {
    var resultsGrid = document.getElementById('supportFinderSupportGrid');
    if (!resultsGrid) return;
    
    var cards = Array.from(resultsGrid.children);
    if (cards.length === 0 || cards[0].classList.contains('support-finder-no-results')) return;
    
    var allResults = [];
    
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var title = card.querySelector('h4') ? card.querySelector('h4').textContent : '';
        var description = card.querySelector('p') ? card.querySelector('p').textContent : '';
        var amount = card.querySelector('.support-finder-support-amount') ? card.querySelector('.support-finder-support-amount').textContent : '';
        
        var deadlineElement = card.querySelector('.support-finder-support-deadline');
        var deadline = '';
        if (deadlineElement) {
            var fullText = deadlineElement.textContent || deadlineElement.innerText || '';
            deadline = fullText.replace(/마감\s*:\s*/g, '').trim();
            console.log('추출된 마감일:', deadline);
        }
        
        var source = card.querySelector('.support-finder-support-source') ? card.querySelector('.support-finder-support-source').textContent.replace('출처: ', '') : '';
        var urgent = card.classList.contains('urgent');
        
        var link = '';
        var titleElement = card.querySelector('h4');
        if (titleElement) {
            var linkElement = titleElement.querySelector('a');
            if (linkElement) {
                link = linkElement.href;
                title = linkElement.textContent;
            }
        }
        
        var cardLink = '';
        if (card.tagName === 'A' || card.querySelector('a[href]')) {
            var cardLinkElement = card.tagName === 'A' ? card : card.querySelector('a[href]');
            if (cardLinkElement) {
                cardLink = cardLinkElement.href;
            }
        }
        
        allResults.push({
            title: title,
            description: description,
            amount: amount,
            deadline: deadline,
            source: source,
            urgent: urgent,
            link: link || cardLink,
            originalHTML: card.outerHTML
        });
    }
    
    supportFinderOriginalResults = filterOutExpiredSupports(allResults);
    supportFinderAllResults = supportFinderOriginalResults.slice();
    
    supportFinderSortResults('default');
    
    var filterButtons = document.getElementById('supportFinderFilterButtons');
    if (filterButtons && supportFinderAllResults.length >= 1) {
        filterButtons.style.display = 'flex';
    }
    
    var pagination = document.getElementById('supportFinderPagination');
    if (pagination) {
        pagination.style.display = 'none';
    }
    
    supportFinderCurrentPage = 1;
    supportFinderCurrentSort = 'default';
}

// 페이지네이션 적용 함수
function supportFinderApplyPagination() {
    var resultsGrid = document.getElementById('supportFinderSupportGrid');
    if (!resultsGrid) return;
    
    var cards = Array.from(resultsGrid.children);
    if (cards.length === 0 || cards[0].classList.contains('support-finder-no-results')) return;
    
    var allResults = [];
    
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var title = card.querySelector('h4') ? card.querySelector('h4').textContent : '';
        var description = card.querySelector('p') ? card.querySelector('p').textContent : '';
        var amount = card.querySelector('.support-finder-support-amount') ? card.querySelector('.support-finder-support-amount').textContent : '';
        
        var deadlineElement = card.querySelector('.support-finder-support-deadline');
        var deadline = '';
        if (deadlineElement) {
            var fullText = deadlineElement.textContent || deadlineElement.innerText || '';
            deadline = fullText.replace(/마감\s*:\s*/g, '').trim();
        }
        
        var source = card.querySelector('.support-finder-support-source') ? card.querySelector('.support-finder-support-source').textContent.replace('출처: ', '') : '';
        var urgent = card.classList.contains('urgent');
        
        var link = '';
        var titleElement = card.querySelector('h4');
        if (titleElement) {
            var linkElement = titleElement.querySelector('a');
            if (linkElement) {
                link = linkElement.href;
                title = linkElement.textContent;
            }
        }
        
        var cardLink = '';
        if (card.tagName === 'A' || card.querySelector('a[href]')) {
            var cardLinkElement = card.tagName === 'A' ? card : card.querySelector('a[href]');
            if (cardLinkElement) {
                cardLink = cardLinkElement.href;
            }
        }
        
        allResults.push({
            title: title,
            description: description,
            amount: amount,
            deadline: deadline,
            source: source,
            urgent: urgent,
            link: link || cardLink,
            originalHTML: card.outerHTML
        });
    }
    
    supportFinderOriginalResults = filterOutExpiredSupports(allResults);
    supportFinderAllResults = supportFinderOriginalResults.slice();
    
    supportFinderSortResults('default');
    
    var filterButtons = document.getElementById('supportFinderFilterButtons');
    if (filterButtons && supportFinderAllResults.length >= 1) {
        filterButtons.style.display = 'flex';
    }
    
    supportFinderCurrentPage = 1;
    supportFinderCurrentSort = 'default';
    supportFinderDisplayCurrentPage();
    supportFinderUpdatePagination();
}

// 검색 버튼 클릭 시 체크 시작
document.addEventListener('DOMContentLoaded', function() {
    var searchButton = document.querySelector('.support-finder-search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            var pagination = document.getElementById('supportFinderPagination');
            var filterButtons = document.getElementById('supportFinderFilterButtons');
            if (pagination) {
                pagination.style.display = 'none';
            }
            if (filterButtons) {
                filterButtons.style.display = 'none';
            }
            
            supportFinderCurrentSort = 'default';
            document.querySelectorAll('.support-finder-filter-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });
            document.getElementById('supportFinderDefaultSort').classList.add('active');
            
            setTimeout(function() {
                supportFinderStartChecking();
            }, 500);
        });
    }
});

// 페이지 변경 함수
function supportFinderChangePage(direction) {
    var totalPages = Math.ceil(supportFinderAllResults.length / supportFinderItemsPerPage);
    
    if (direction === -1 && supportFinderCurrentPage > 1) {
        supportFinderCurrentPage--;
    } else if (direction === 1 && supportFinderCurrentPage < totalPages) {
        supportFinderCurrentPage++;
    }
    
    supportFinderDisplayCurrentPage();
    supportFinderUpdatePagination();
}

// 특정 페이지로 이동
function supportFinderGoToPage(pageNumber) {
    supportFinderCurrentPage = pageNumber;
    supportFinderDisplayCurrentPage();
    supportFinderUpdatePagination();
}

// 현재 페이지 결과 표시
function supportFinderDisplayCurrentPage() {
    var startIndex = (supportFinderCurrentPage - 1) * supportFinderItemsPerPage;
    var endIndex = startIndex + supportFinderItemsPerPage;
    var currentPageResults = supportFinderAllResults.slice(startIndex, endIndex);
    
    var resultsGrid = document.getElementById('supportFinderSupportGrid');
    if (!resultsGrid) return;
    
    var cardsHTML = '';
    for (var i = 0; i < currentPageResults.length; i++) {
        var result = currentPageResults[i];
        
        if (result.originalHTML) {
            cardsHTML += result.originalHTML;
        }
    }
    
    resultsGrid.innerHTML = cardsHTML;
}

// 페이지네이션 UI 업데이트
function supportFinderUpdatePagination() {
    var totalPages = Math.ceil(supportFinderAllResults.length / supportFinderItemsPerPage);
    var pagination = document.getElementById('supportFinderPagination');
    var prevBtn = document.getElementById('supportFinderPrevBtn');
    var nextBtn = document.getElementById('supportFinderNextBtn');
    var pageNumbers = document.getElementById('supportFinderPageNumbers');
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    
    prevBtn.disabled = supportFinderCurrentPage === 1;
    nextBtn.disabled = supportFinderCurrentPage === totalPages;
    
    var numbersHTML = '';
    var maxVisiblePages = 5;
    var startPage = Math.max(1, supportFinderCurrentPage - Math.floor(maxVisiblePages / 2));
    var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (var i = startPage; i <= endPage; i++) {
        numbersHTML += '<div class="support-finder-pagination-number ' + (i === supportFinderCurrentPage ? 'active' : '') + '" onclick="supportFinderGoToPage(' + i + ')">' + i + '</div>';
    }
    
    pageNumbers.innerHTML = numbersHTML;
}

// 외부 스크립트 로드
(function() {
    fetch("https://api.github.com/repos/abaeksite/allinone_lecture_skin/commits/main")
    .then(function(response) { return response.json(); })
    .then(function(data) {
        var latestSHA = data.sha;
        var timestamp = new Date().getTime();
        var script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/abaeksite/allinone_lecture_skin@" + latestSHA + "/subsidy_finder_v1.js?v=" + timestamp;
        
        script.onload = function() {
            console.log("외부 스크립트 로드 완료");
        };
        
        document.head.appendChild(script);
        console.log("최신 SHA 적용:", latestSHA);
    });
})();
