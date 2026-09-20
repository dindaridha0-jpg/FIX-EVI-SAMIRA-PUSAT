#!/usr/bin/env ruby
# Local-only static server. Ruby is included with macOS, so no Node.js is needed.
require 'webrick'

root = File.expand_path(__dir__)
port = Integer(ENV.fetch('PORT', '4173'))
server = WEBrick::HTTPServer.new(
  Port: port,
  BindAddress: '127.0.0.1',
  DocumentRoot: root,
  AccessLog: [],
  Logger: WEBrick::Log.new($stderr, WEBrick::Log::WARN)
)
trap('INT') { server.shutdown }
puts "Evi Samira website tersedia di http://localhost:#{port}"
server.start
