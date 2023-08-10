	<?php
	error_reporting(0);
	// header('Access-Control-Allow-Origin: *');
	// header('Content-Type: application/json');
	date_default_timezone_set('Asia/Tashkent');

	$data = ['ok'=>false, 'code'=>null, 'message'=>null, 'result'=>[]];
	if ($_SERVER['REQUEST_METHOD'] == 'POST' OR $_SERVER['REQUEST_METHOD'] == 'GET') {
		require './config/config.php';
		$db = new dbmysqli;
    	$db->dbConnect();

		extract($_REQUEST);
		$action = strtolower(trim(getenv('ORIG_PATH_INFO') ? : getenv('PATH_INFO'), '/'));
		if ($action == 'adminlogin'){
			if (isset($login) && isset($password)) {
				$admin = $db->selectWhere('admin',[
                    [
                        'login'=>$login,
                        'cn'=>'='
                    ],
                    [
                        'password'=>$password,
                        'cn'=>'='
                    ],
                ]);
                if ($admin->num_rows) {
                	$admin = mysqli_fetch_assoc($admin);
                	if ($admin['password'] == $password) {
                		$data['ok'] = true;
                		$data['code'] = 200;
                		$data['message'] = 'Loggid in successfully';
                		foreach ($admin as $key => $value) $data['result'][$key] = $value;
                	}else{
                		$data['code'] = 403;
                		$data['message'] = 'password is invalid';
                	}
                }else{
                	$data['code'] = 403;
                	$data['message'] = 'login or password is invalid';
                }
			}else{
				$data['code'] = 402;
                $data['message'] = 'login and password is required';
			}
		}else if($action == 'checkadmin'){
			if (isset($unique_id)) {
				$admin = $db->selectWhere('admin',[
                    [
                        'unique_id'=>$unique_id,
                        'cn'=>'='
                    ],
                ]);
                if ($admin->num_rows) {
            		$data['ok'] = true;
            		$data['code'] = 200;
            		$data['message'] = 'Loggid in successfully';
            		foreach ($admin as $key => $value) $data['result'][$key] = $value;
                }else{
                	$data['code'] = 403;
                	$data['message'] = 'unique_id is invalid';
                }
			}else{
				$data['code'] = 402;
                $data['message'] = 'unique_id is required';
			}
		}else if($action == 'admineditprofile'){
			if (isset($unique_id)) {
				$admin = $db->selectWhere('admin',[
                    [
                        'unique_id'=>$unique_id,
                        'cn'=>'='
                    ],
                ]);
                if ($admin->num_rows) {
                	$admin = mysqli_fetch_assoc($admin);
                	$login = $login ? $login : $admin['login'];
                	$password = $password ? $password : $admin['password'];

                	$update = $db->update('admin',[
                        'login'=>$login,
                        'password'=>$password,
                    ],[
                        'unique_id'=>$unique_id,
                        'cn'=>'='
                    ]);
                    if ($update) {
                    	$data['ok'] = true;
                    	$data['code'] = 200;
                    	$data['message'] = "Admin profile edited successfully";
                    	$admin = mysqli_fetch_assoc($db->selectWhere('admin',[
		                    [
		                        'unique_id'=>$unique_id,
		                        'cn'=>'='
		                    ],
		                ]));
		                foreach ($admin as $key => $value) $data['result'][$key] = $value;
                    }else{
                    	$data['code'] = 500;
                    	$data['message'] = "Set interval error";
                    }
                }else{
                	$data['code'] = 403;
                	$data['message'] = 'unique_id is invalid';
                }
			}else{
				$data['code'] = 402;
                $data['message'] = 'unique_id is required';
			}
		}else if($action == 'addcategory'){
			if (isset($unique_id)) {
				$admin = $db->selectWhere('admin',[
			        [
			            'unique_id'=>$unique_id,
			            'cn'=>'='
			        ],
			    ]);
			    if ($admin->num_rows) {
			    	if (isset($name)) {
	                    $ins = $db->insertInto('category',[
						    'name'=>$name,
						]);

						$data['code'] = 200;
						$data['message'] = 'The category has added';

						if (!$ins) {
						    $data['code'] = 500;
						    $data['message'] = 'Insert error: 500 set interval error';
						}

						$data['ok'] = true;
						$category = $db->selectWhere('category',[
						    [
						        'id'=>0,
						        'cn'=>'>'
						    ],
						]);
						foreach ($category as $key => $value) $data['result'][$key] = $value;
				    }else{
				    	$data['code'] = 402;
			    		$data['message'] = 'name is required';
				    }
				}else{
					$data['code'] = 403;
				    $data['message'] = 'unique_id is invalid';
				}
			}else{
				$data['code'] = 402;
			    $data['message'] = 'unique_id is required';
			}
		}else if($action == 'getallcategory'){
			$category = $db->selectWhere('category',[
			    [
			        'id'=>0,
			        'cn'=>'>'
			    ],
			]);
			$data['ok'] = true;
			if ($category->num_rows) {
			    $data['code'] = 200;
			    $data['message'] = "Category count: " . $category->num_rows;
			    foreach ($category as $key => $value) $data['result'][] = $value;
			}else{
			    $data['code'] = 405;
			    $data['message'] = "There are no new category";
			}
		}else if($action == 'addbook'){
			if (isset($unique_id)) {
				$admin = $db->selectWhere('admin',[
			        [
			            'unique_id'=>$unique_id,
			            'cn'=>'='
			        ],
			    ]);
			    if ($admin->num_rows) {
			    	// print_r($_FILES['book']);
			    	// print_r($_FILES['img']);
			    	// print_r($author);
			    	if (isset($name) && isset($author) && isset($_FILES['img']) && isset($category_id)) {
			    		$imgAllowed = array('png','jpg','jpeg','jff');
		                $imgFilename = $_FILES['img']['name'];

		                $ext = strtolower(pathinfo($imgFilename, PATHINFO_EXTENSION));
		                if (in_array($ext, $imgAllowed)) {
		                    if (file_exists('../uploads/' . $imgFilename)) {
		                        $imgFilename = time() . "_" . $imgFilename;
		                    }
		                    move_uploaded_file($_FILES['img']['tmp_name'], '../uploads/' . $imgFilename);

		                    $bookAllowed = array('docx','pdf','txt');
			                $bookFilename = $_FILES['book']['name'];

			                $ext = strtolower(pathinfo($bookFilename, PATHINFO_EXTENSION));
			                if (in_array($ext, $bookAllowed)) {
			                    if (file_exists('../uploads/' . $bookFilename)) {
			                        $bookFilename = time() . "_" . $bookFilename;
			                    }
			                    move_uploaded_file($_FILES['book']['tmp_name'], '../uploads/' . $bookFilename);

			                    $category = $db->selectWhere('category',[
							        [
							            'id'=>$category_id,
							            'cn'=>'='
							        ],
							    ]);
							    if ($category->num_rows) {
							    	$ins = $db->insertInto('book',[
									    'name'=>$name,
									    'author'=>$author,
									    'img'=>$imgFilename,
									    'book'=>$bookFilename,
									    'category_id'=>$category_id,
									    'down'=>0
									]);
									if (!$ins) {
									    $data['code'] = 500;
									    $data['message'] = 'Insert error: 500 set interval error';
									}
							    }else{
							    	$data['code'] = 403;
				    				$data['message'] = 'category_id is invalid';
							    }
								$data['code'] = 200;
								$data['message'] = 'The book has added';
			                }else{
			                	$data['code'] = 400;
		                    	$data['message'] = "File type is not supported. (book)";
			                }
		                }else{
		                	$data['code'] = 400;
		                    $data['message'] = "File type is not supported. (img)";
		                }

						$data['ok'] = true;
						$book = $db->selectWhere('book',[
						    [
						        'id'=>0,
						        'cn'=>'>'
						    ],
						]);
						foreach ($book as $key => $value) $data['result'][$key] = $value;
				    }else{
				    	$data['code'] = 402;
			    		$data['message'] = 'name, author, img, book, category_id are required';
				    }
				}else{
					$data['code'] = 403;
				    $data['message'] = 'unique_id is invalid';
				}
			}else{
				$data['code'] = 402;
			    $data['message'] = 'unique_id is required';
			}
		}else if($action == 'getbook'){
			if (isset($category_id)) {
				$book = $db->selectWhere('book',[
				    [
				        'category_id'=>$category_id,
				        'cn'=>'='
				    ],
				]);
				$data['ok'] = true;
				if ($book->num_rows) {
				    $data['code'] = 200;
				    $data['message'] = "Book count: " . $book->num_rows;
				    foreach ($book as $key => $value) $data['result'][] = $value;
				}else{
				    $data['code'] = 405;
				    $data['message'] = "There are no new book";
				}
			}else{
				$book = $db->selectWhere('book',[
				    [
				        'id'=>0,
				        'cn'=>'>'
				    ],
				], "ORDER BY id DESC");
				$data['ok'] = true;
				if ($book->num_rows) {
				    $data['code'] = 200;
				    $data['message'] = "Book count: " . $book->num_rows;
				    foreach ($book as $key => $value) $data['result'][] = $value;
				}else{
				    $data['code'] = 405;
				    $data['message'] = "There are no new book";
				}
			}
		}else if($action == 'delbook'){
			if (isset($unique_id)) {
				$admin = $db->selectWhere('admin',[
			        [
			            'unique_id'=>$unique_id,
			            'cn'=>'='
			        ],
			    ]);
			    if ($admin->num_rows) {
			    	if (isset($book_id)) {
			    		$del = $db->delete('book',[
			    			[
			    				'id'=>$book_id,
							    'cn'=>'='
			    			]
						]);
						$data['ok'] = true;
						if ($del) {
						    $data['code'] = 200;
						    $data['message'] = 'The book was deleted';
						}
						$book = $db->selectWhere('book',[
						    [
						        'id'=>0,
						        'cn'=>'>'
						    ],
						]);
						if ($book->num_rows) {
						    $data['message'] = $data['message'] . " book count: " . $book->num_rows;
						    foreach ($book as $key => $value) $data['result'][] = $value;
						}else{
						    $data['code'] = 200;
						    $data['message'] = $data['message'] . " There are no new book";
						}
			    	}else{
			    		$data['code'] = 403;
						$data['message'] = 'news_id is required';
			    	}
			    }else{
			    	$data['code'] = 403;
			    	$data['message'] = 'unique_id is invalid';
			    }
			}else{
				$data['code'] = 402;
			    $data['message'] = 'unique_id is required';
			}
		}else if($action == 'bookdown'){
			if (isset($book_id)) {
				$book = $db->selectWhere('book',[
                    [
                        'id'=>$book_id,
                        'cn'=>'='
                    ],
                ]);
                if ($book->num_rows) {
                	$down = mysqli_fetch_assoc($book);
            		$update = $db->update('book',[
                        'down'=>$down['down'] + 1,
                    ],[
                        'id'=>$book_id,
                        'cn'=>'='
                    ]);
                    if ($update) {
                    	$data['ok'] = true;
                    	$data['code'] = 200;
                    	$data['message'] = "book successfully";
                    	$book = mysqli_fetch_assoc($db->selectWhere('book',[
		                    [
		                        'id'=>$book_id,
		                        'cn'=>'='
		                    ],
		                ]));
		                foreach ($book as $key => $value) $data['result'][$key] = $value;
                    }else{
                    	$data['code'] = 500;
                    	$data['message'] = "Set interval error";
                    }
                }else{
                	$data['code'] = 403;
                	$data['message'] = 'book_id is invalid';
                }
			}else{
				$data['code'] = 402;
                $data['message'] = 'book_id is required';
			}
		}else if($action == 'addnews'){
			if (isset($unique_id)) {
				$admin = $db->selectWhere('admin',[
			        [
			            'unique_id'=>$unique_id,
			            'cn'=>'='
			        ],
			    ]);
			    if ($admin->num_rows) {
			    	if (isset($title) && isset($description) && isset($_FILES['img'])) {
			    		$allowed = array('png','jpg','jpeg','gif','jff');
		                $filename = $_FILES['img']['name'];

		                $ext = pathinfo($filename, PATHINFO_EXTENSION);
		                if (in_array($ext, $allowed)) {
		                    if (file_exists('../uploads/' . $filename)) {
		                        $filename = time() . "_" . $filename;
		                    }
		                    move_uploaded_file($_FILES['img']['tmp_name'], '../uploads/' . $filename);
		                    $ins = $db->insertInto('news',[
							    'title'=>$title,
							    'description'=>$description,
							    'img'=>$filename
							]);

							$data['code'] = 200;
							$data['message'] = 'The news has successfully added';

							if (!$ins) {
							    $data['code'] = 500;
							    $data['message'] = 'Insert error: 500 set interval error';
							}

							$data['ok'] = true;
							$news = $db->selectWhere('news',[
							    [
							        'id'=>0,
							        'cn'=>'>'
							    ],
							]);
							foreach ($news as $key => $value) $data['result'][$key] = $value;
		                }else{
		                    $data['code'] = 400;
		                    $data['message'] = "File type is not supported";
		                }
			    	}else{
			    		$data['code'] = 403;
						$data['message'] = 'title, description, img are required';
			    	}
			    }else{
			    	$data['code'] = 403;
			    	$data['message'] = 'unique_id is invalid';
			    }
			}else{
				$data['code'] = 402;
			    $data['message'] = 'unique_id is required';
			}
		}else if($action == 'getallnews'){
			$news = $db->selectWhere('news',[
			    [
			        'id'=>0,
			        'cn'=>'>'
			    ],
			], "ORDER BY id DESC");
			$data['ok'] = true;
			if ($news->num_rows) {
			    $data['code'] = 200;
			    $data['message'] = "News count: " . $news->num_rows;
			    foreach ($news as $key => $value) $data['result'][] = $value;
			}else{
			    $data['code'] = 405;
			    $data['message'] = "There are no new news";
			}
		}else if($action == 'delnews'){
			if (isset($unique_id)) {
				$admin = $db->selectWhere('admin',[
			        [
			            'unique_id'=>$unique_id,
			            'cn'=>'='
			        ],
			    ]);
			    if ($admin->num_rows) {
			    	if (isset($news_id)) {
			    		$del = $db->delete('news',[
			    			[
			    				'id'=>$news_id,
							    'cn'=>'='
			    			]
						]);
						$data['ok'] = true;
						if ($del) {
						    $data['code'] = 200;
						    $data['message'] = 'The news was deleted';
						}
						$news = $db->selectWhere('news',[
						    [
						        'id'=>0,
						        'cn'=>'>'
						    ],
						]);
						if ($news->num_rows) {
						    $data['message'] = $data['message'] . " news count: " . $news->num_rows;
						    foreach ($news as $key => $value) $data['result'][] = $value;
						}else{
						    $data['code'] = 200;
						    $data['message'] = $data['message'] . " There are no new news";
						}
			    	}else{
			    		$data['code'] = 403;
						$data['message'] = 'news_id is required';
			    	}
			    }else{
			    	$data['code'] = 403;
			    	$data['message'] = 'unique_id is invalid';
			    }
			}else{
				$data['code'] = 402;
			    $data['message'] = 'unique_id is required';
			}
		}else if($action == 'search'){
			if (isset($text)) {
				$book = $db->selectWhere('book',[
				    [
				        'id'=>0,
				        'cn'=>'>'
				    ],
				], "CONCAT(name) LIKE '%$text%'");
				$data['ok'] = true;
				if ($book->num_rows) {
				    $data['code'] = 200;
				    $data['message'] = "book count: " . $book->num_rows;
				    foreach ($book as $key => $value) $data['result'][] = $value;
				}else{
				    $data['code'] = 405;
				    $data['message'] = "There are no new book";
				}
			}
		}else{
			$data['code'] = 401;
            $data['message'] = 'Method not found';
		}
	}else{
		$data['code'] = 400;
		$data['message'] = "Method not allowed. Allowed Method: POST";
	}
	unset($data['result']['password']);
	echo json_encode($data,  JSON_PRETTY_PRINT);
?> 