<?php

use Wpt\Includes\Wpt;

/************************************
 *      BLOCK DIRECT ACCESS
 ************************************/

if ( ! defined('WPINC')) {
    die;
}

/************************************
 *      AUTO LOADING
 ************************************/

require_once 'vendor/autoload.php';

/************************************
 *      CONSTANTS
 ************************************/

define ('NPLDIR', plugin_dir_path(__FILE__));
define ('NPLFILE', __FILE__);
define ('WPT_THEME_URI', get_template_directory_uri());

$wpt = new Wpt();