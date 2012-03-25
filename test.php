<?php

/**
 * @author Frederick Behrends
 * @copyright 2012
 */

    $circle_x = $_POST['roundselect_cx'];
    $circle_y = $_POST['roundselect_cy'];
    $circle_w = $_POST['roundselect_rx']*2;
    $circle_h = $_POST['roundselect_ry']*2;

   // 1. Start with the original image
    $img = imagecreatefromjpeg("background.jpg");
    $img_magicpink = imagecolorallocatealpha($img, 255, 0, 255, 127);
    //imagecolortransparent($img, $img_magicpink);

    // (Get its dimensions for copying)
    list($w, $h) = getimagesize("background.jpg");

    // 2. Create the first copy
    $copy = imagecreatefromjpeg("test.jpg");
    imagealphablending($copy, true);

    $copy_magicpink = imagecolorallocate($copy, 255, 0, 255);
    imagecolortransparent($copy, $copy_magicpink);

    // 3. Create the mask
    $mask = imagecreatetruecolor($w, $h);
    imagealphablending($mask, true);

    // 3-1. Set the masking colours
    $mask_black = imagecolorallocate($mask, 0, 0, 0);
    $mask_magicpink = imagecolorallocate($mask, 255, 0, 255);
    imagecolortransparent($mask, $mask_black);
    imagefill($mask, 0, 0, $mask_magicpink);

    // 3-2. Draw the circle for the mask
    imagefilledellipse($mask, $circle_x, $circle_y, $circle_w, $circle_h, $mask_black);

    // 4. Copy the mask over the top of the copied image, and apply the mask as an alpha layer
    imagecopymerge($copy, $mask, 0, 0, 0, 0, $w, $h, 100);
    imagedestroy($mask);


    // 5. Merge the copy with the origianl - maintaining alpha
    imagecopymergegray($img, $copy, 0, 0, 0, 0, $w, $h, 100);

    imagedestroy($copy);
    imagealphablending($img, true);
    imagecolortransparent($img, $mask_magicpink);


    header('Content-Type: image/png');
    imagepng($img);
    imagedestroy($img);

?>