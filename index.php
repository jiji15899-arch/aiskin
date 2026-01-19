<?php
/**
 * 정부지원금 찾기 테마 - 메인 페이지
 * 
 * @package Subsidy_Finder
 */

get_header(); ?>

<div class="support-finder-container">
    <div class="support-finder-header">
        <div class="support-finder-header-top">
            <div class="support-finder-logo">
                <!-- 아래 내용 변경은 명백한 저작권법 위법이며, 민형사 소송에 있어 철저한 불관용 원칙을 적용합니다 -->      
                <img alt="로고 이미지" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhwxd_YGfZiM_d9LPozylA_vt2w36-eanzKSgvMQm2zkh-s41pKzT2FDyyqB9cz713Tm3nRFVbtRR8GGXlEQh7UDr4BDteEwfQ_JDV0Yl_xYA5uBGWrqyhDLH_PNEa9cJmNLOhhFc7XKAJChRiR9_6KZbraUo8FpA2IGMxbgMNGAtnoi-WlBnWYpnm0FKw/w945-h600-p-k-no-nu/img.png">
            </div>
            <div class="support-finder-date" id="supportFinderCurrentDate"></div>
        </div>
        <h1>정부지원금 찾기</h1>
        <p>나이와 지역을 선택하여 받을 수 있는 정부지원금을 확인하세요</p>
    </div>
 
    <div class="wp-adsense-container">
        <script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-12341234"></script>
        <!-- 워드프레스 최상단 광고 -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-12341234"
             data-ad-slot="4333687551"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>

    <div class="support-finder-filter-section">
        <div class="support-finder-filter-group">
            <h3>👤 연령대 선택</h3>
            <div class="support-finder-checkbox-grid">
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderAge20" type="checkbox" value="20대">
                    <label for="supportFinderAge20">20대</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderAge30" type="checkbox" value="30대">
                    <label for="supportFinderAge30">30대</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderAge40" type="checkbox" value="40대">
                    <label for="supportFinderAge40">40대</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderAge50" type="checkbox" value="50대">
                    <label for="supportFinderAge50">50대</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderAge60" type="checkbox" value="60대">
                    <label for="supportFinderAge60">60대</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderAge70" type="checkbox" value="70대">
                    <label for="supportFinderAge70">70대</label>
                </div>
            </div>
        </div>

        <div class="support-finder-filter-group">
            <h3>🏢 지역 선택</h3>
            <div class="support-finder-checkbox-grid">
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderSeoul" type="checkbox" value="서울특별시">
                    <label for="supportFinderSeoul">서울특별시</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderBusan" type="checkbox" value="부산광역시">
                    <label for="supportFinderBusan">부산광역시</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderDaegu" type="checkbox" value="대구광역시">
                    <label for="supportFinderDaegu">대구광역시</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderIncheon" type="checkbox" value="인천광역시">
                    <label for="supportFinderIncheon">인천광역시</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderGwangju" type="checkbox" value="광주광역시">
                    <label for="supportFinderGwangju">광주광역시</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderDaejeon" type="checkbox" value="대전광역시">
                    <label for="supportFinderDaejeon">대전광역시</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderUlsan" type="checkbox" value="울산광역시">
                    <label for="supportFinderUlsan">울산광역시</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderSejong" type="checkbox" value="세종시">
                    <label for="supportFinderSejong">세종시</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderGyeonggi" type="checkbox" value="경기도">
                    <label for="supportFinderGyeonggi">경기도</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderGangwon" type="checkbox" value="강원도">
                    <label for="supportFinderGangwon">강원도</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderChungbuk" type="checkbox" value="충청북도">
                    <label for="supportFinderChungbuk">충청북도</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderChungnam" type="checkbox" value="충청남도">
                    <label for="supportFinderChungnam">충청남도</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderJeonbuk" type="checkbox" value="전라북도">
                    <label for="supportFinderJeonbuk">전라북도</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderJeonnam" type="checkbox" value="전라남도">
                    <label for="supportFinderJeonnam">전라남도</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderGyeongbuk" type="checkbox" value="경상북도">
                    <label for="supportFinderGyeongbuk">경상북도</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderGyeongnam" type="checkbox" value="경상남도">
                    <label for="supportFinderGyeongnam">경상남도</label>
                </div>
                <div class="support-finder-checkbox-item">
                    <input id="supportFinderJeju" type="checkbox" value="제주도">
                    <label for="supportFinderJeju">제주도</label>
                </div>
            </div>
        </div>

        <button class="support-finder-search-button" onclick="supportFinderStartSearch()">
            🔍 지원금 검색하기
        </button>
    </div>

    <div class="support-finder-results-section">
        <div class="support-finder-results-header">
            <h2>검색 결과</h2>
            <div class="support-finder-results-count" id="supportFinderResultsCount">0개 지원금</div>
        </div>
        <div class="support-finder-filter-buttons" id="supportFinderFilterButtons" style="display: none;">
            <span class="support-finder-filter-label">정렬:</span>
            <button class="support-finder-filter-btn active" id="supportFinderDefaultSort" onclick="supportFinderSortResults('default')">
                기본순
            </button>
            <button class="support-finder-filter-btn" id="supportFinderDeadlineSort" onclick="supportFinderSortResults('deadline')">
                마감일순
            </button>
            <button class="support-finder-filter-btn" id="supportFinderAmountSort" onclick="supportFinderSortResults('amount')">
                지원금액순
            </button>
        </div>
        <div class="support-finder-support-grid" id="supportFinderSupportGrid">
            <div class="support-finder-no-results">
                <div style="font-size: 48px; margin-bottom: 20px;">💰</div>
                <div><strong>정부지원금 검색 서비스</strong></div>
                <div style="font-size: 14px; margin-top: 10px; color: #666;">
                    연령대와 지역을 선택한 후 검색하면<br>
                    <span style="color: #4285F4; font-weight: 600;">최신 정부지원금</span>을 찾아드립니다!<br>
                    <small style="color: #999; margin-top: 8px; display: block;">
                        💰 최신 정부지원금 정보 제공<br>
                        ✨ 정확한 최신 정보만을 표시합니다 ✨
                    </small>
                </div>
            </div>
        </div>
        <div class="support-finder-pagination" id="supportFinderPagination" style="display: none;">
            <button class="support-finder-pagination-btn support-finder-pagination-prev" id="supportFinderPrevBtn" onclick="supportFinderChangePage(-1)">
                ← 이전
            </button>
            <div class="support-finder-pagination-numbers" id="supportFinderPageNumbers"></div>
            <button class="support-finder-pagination-btn support-finder-pagination-next" id="supportFinderNextBtn" onclick="supportFinderChangePage(1)">
                다음 →
            </button>
        </div>
    </div>

    <div class="wp-adsense-container">
        <a href="https://plus.gov.kr/">
            <button class="aros-button">더 많은 지원금 보기 👆</button>
        </a>
    </div>
  
    <div class="wp-adsense-container">
        <script async crossorigin="anonymous" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-12341234"></script>
        <!-- 워드프레스 하단 광고 -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-12341234"
             data-ad-slot="4333687551"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </div>

</div>

<?php get_footer(); ?>
