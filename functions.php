<?php
/**
 * 정부지원금 찾기 테마 Functions
 * 
 * @package Subsidy_Finder
 */

// 테마 셋업
function subsidy_finder_setup() {
    // 테마 지원 기능
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
}
add_action('after_setup_theme', 'subsidy_finder_setup');

// 스타일시트와 스크립트 등록
function subsidy_finder_scripts() {
    // 메인 스타일시트
    wp_enqueue_style('subsidy-finder-style', get_stylesheet_uri(), array(), '1.0');
    
    // Custom JavaScript
    wp_enqueue_script('subsidy-finder-custom', get_template_directory_uri() . '/custom.js', array(), '1.0', true);
    
    // 아로스 애드센스 무효트래픽 방지 스크립트
    wp_enqueue_script('aros-adsense-blocker', 'https://cdn.jsdelivr.net/gh/abaeksite/aros_adsense_blocker@main/aros_adsense_blocker_v7-1.js', array(), null, false);
}
add_action('wp_enqueue_scripts', 'subsidy_finder_scripts');

// 애드센스 무효트래픽 방지 코드 추가
function subsidy_finder_adsense_blocker() {
    ?>
    <script>
        window.redirectTarget = "https://aros100.com";
    </script>
    <?php
}
add_action('wp_head', 'subsidy_finder_adsense_blocker', 1);

// Open Graph 메타 태그 추가
function subsidy_finder_og_tags() {
    ?>
    <!-- Open Graph 메타 태그 -->
    <meta property="og:title" content="AI 최신 지원금 - 정부지원금 찾기">
    <meta property="og:description" content="나이와 지역을 선택하여 받을 수 있는 정부지원금을 쉽게 찾아보세요. 최신 정부지원금 정보를 실시간으로 제공합니다.">
    <meta property="og:image" content="https://ifh.cc/g/JSl2AD.png">
    <meta property="og:image:secure_url" content="https://ifh.cc/g/JSl2AD.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="AI 최신 지원금">
    <meta property="og:image:type" content="image/png">
    <meta property="og:url" content="<?php echo esc_url(home_url('/')); ?>">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="AI 최신 지원금">
    
    <!-- Twitter Card 메타 태그 -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="AI 최신 지원금 - 정부지원금 찾기">
    <meta name="twitter:description" content="나이와 지역을 선택하여 받을 수 있는 정부지원금을 쉽게 찾아보세요.">
    <meta name="twitter:image" content="https://ifh.cc/g/0Z9xSr.png">
    <meta name="twitter:image:alt" content="AI 최신 지원금">
    
    <!-- 기본 메타 태그 -->
    <meta name="description" content="나이와 지역을 선택하여 받을 수 있는 정부지원금을 쉽게 찾아보세요. 최신 정부지원금 정보를 실시간으로 제공합니다.">
    <link rel="image_src" href="https://ifh.cc/g/JSl2AD.png">
    <?php
}
add_action('wp_head', 'subsidy_finder_og_tags');

// 불필요한 워드프레스 기본 기능 제거 (선택사항)
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');

// 워드프레스 버전 정보 제거 (보안)
remove_action('wp_head', 'wp_generator');

// 관리자 바 숨기기 (선택사항 - 필요시 주석 해제)
// add_filter('show_admin_bar', '__return_false');

?>
